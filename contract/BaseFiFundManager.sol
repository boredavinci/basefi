// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./BaseFiTokenTemplate.sol";

contract BaseFiFundManager {
	enum Stage {
		FUNDING,
		MANAGEMENT,
		EXIT
	}

	struct Exit {
		uint256 totalPayback;
		uint256 seniorPayback;
		uint256 juniorPayback;
		uint256 seniorSupply;
		uint256 juniorSupply;
		uint256 timestamp;
	}

	struct FundInfo {
		string name;
		bytes32 symbol;
		address admin;
		address seniorToken;
		address juniorToken;
		uint256 totalValue;
		uint8 ltv;
		uint8 srAPY;
		uint8 jrAPY;
		address depositToken;
		uint256 fundingAmount;
		Stage stage;
		uint256 closeFundingTimestamp;
	}

	mapping(bytes32 => FundInfo) public fundMap;
	mapping(bytes32 => Exit) public exitMap;

	event FundDeployed(
		string name,
		bytes32 indexed symbol,
		address indexed admin,
		address seniorToken,
		address juniorToken,
		uint8 ratio,
		uint8 srAPY,
		uint8 jrAPY,
		address depositToken
	);

	event Invested(
		bytes32 indexed symbol,
		address indexed user,
		bool isSenior,
		uint256 amount
	);

	event FundingEnded(bytes32 indexed symbol, uint256 amount);

	event Exited(
		bytes32 indexed symbol,
		uint256 totalPayback,
		uint256 seniorPayback,
		uint256 juniorPayback,
		uint256 seniorSupply,
		uint256 juniorSupply
	);

	event Withdraw(
		bytes32 indexed symbol,
		address indexed user,
		uint256 amount,
		uint256 seniorPayback,
		uint256 juniorPayback
	);

	modifier onlyFundAdmin(bytes32 symbol) {
		require(fundMap[symbol].admin == msg.sender, "Only fund admin");
		_;
	}

	function deployNewFund(
		string memory name,
		bytes32 symbol,
		address admin,
		uint256 totalValue,
		uint8 ltv, // [0..100]
		uint8 srAPY, // [0..100]
		uint8 jrAPY, // [0..100]
		address depositToken,
		uint256 closeFundingTimestamp
	) external {
		require(ltv <= 100, "Ratio must be between 0 and 100");
		require(srAPY <= 100, "Ratio must be between 0 and 100");
		require(symbol != 0, "Token symbol cannot be empty");
		require(fundMap[symbol].symbol == 0, "Token symbol already exist");

		uint256 seniorSupply = SafeMath.div(SafeMath.mul(totalValue, ltv), 100);
		uint256 juniorSupply = SafeMath.sub(totalValue, seniorSupply);

		BaseFiTokenTemplate seniorToken = new BaseFiTokenTemplate(
			string.concat(name, "Senior"),
			string.concat(string(abi.encodePacked(symbol)), "Sr"),
			seniorSupply,
			true
		);

		BaseFiTokenTemplate juniorToken = new BaseFiTokenTemplate(
			string.concat(name, "Junior"),
			string.concat(string(abi.encodePacked(symbol)), "Jr"),
			juniorSupply,
			false
		);

		fundMap[symbol] = FundInfo({
			name: name,
			symbol: symbol,
			admin: admin,
			seniorToken: address(seniorToken),
			juniorToken: address(juniorToken),
			totalValue: totalValue,
			ltv: ltv,
			srAPY: srAPY,
			jrAPY: jrAPY,
			depositToken: depositToken,
			fundingAmount: 0,
			stage: Stage.FUNDING,
			closeFundingTimestamp: closeFundingTimestamp
		});

		emit FundDeployed(
			name,
			symbol,
			admin,
			address(seniorToken),
			address(juniorToken),
			ltv,
			srAPY,
			jrAPY,
			depositToken
		);
	}

	function invest(bytes32 symbol, bool isSenior, uint256 amount) public {
		FundInfo storage fund = fundMap[symbol];
		require(fund.stage == Stage.FUNDING, "Asset not in funding stage");

		IERC20 depositToken = IERC20(fund.depositToken);
		depositToken.transferFrom(msg.sender, address(this), amount);

		if (isSenior) {
			BaseFiTokenTemplate seniorToken = BaseFiTokenTemplate(
				fund.seniorToken
			);
			seniorToken.mint(msg.sender, amount);
		} else {
			BaseFiTokenTemplate juniorToken = BaseFiTokenTemplate(
				fund.juniorToken
			);
			juniorToken.mint(msg.sender, amount);
		}

		fundMap[symbol].fundingAmount += amount;
		emit Invested(symbol, msg.sender, isSenior, amount);
	}

	function endFundingAndClaim(bytes32 symbol) public onlyFundAdmin(symbol) {
		FundInfo storage fund = fundMap[symbol];
		require(fund.stage == Stage.FUNDING, "Asset already finished");

		IERC20 depositToken = IERC20(fund.depositToken);
		depositToken.transfer(msg.sender, fund.fundingAmount);
		fund.closeFundingTimestamp = block.timestamp;
		fund.stage == Stage.MANAGEMENT;
	}

	function exitAndPayback(
		bytes32 symbol,
		uint256 amount
	) public onlyFundAdmin(symbol) {
		FundInfo storage fund = fundMap[symbol];
		require(fund.stage == Stage.MANAGEMENT, "Asset already finished");

		IERC20 depositToken = IERC20(fund.depositToken);
		depositToken.transferFrom(msg.sender, address(this), amount);

		Exit storage exit = exitMap[symbol];
		exit.timestamp = block.timestamp;
		exit.totalPayback = fund.totalValue;
		exit.seniorSupply = IERC20(fund.seniorToken).totalSupply();
		exit.juniorSupply = IERC20(fund.juniorToken).totalSupply();

		uint256 secondsElapsed = SafeMath.sub(
			exit.timestamp,
			fund.closeFundingTimestamp
		);
		uint256 daysElapsed = SafeMath.div(secondsElapsed, 1 days);

		exit.seniorPayback = _calculateAccruedInterest(
			amount,
			daysElapsed,
			fund.srAPY
		);
		exit.juniorPayback = amount - exit.seniorPayback;

		fund.stage == Stage.EXIT;
		emit Exited(
			symbol,
			amount,
			exit.seniorPayback,
			exit.juniorPayback,
			exit.seniorSupply,
			exit.juniorSupply
		);
	}

	function withdrawal(bytes32 symbol) public {
		FundInfo memory fund = fundMap[symbol];
		require(fund.stage == Stage.EXIT, "Fund must have exited");
		require(exitMap[symbol].timestamp > 0, "Fund must have exited");

		// get a proportion of the distribution
		(uint256 seniorPayback, uint256 seniorBalance) = calculateSeniorPayback(
			symbol,
			msg.sender
		);
		BaseFiTokenTemplate(fund.seniorToken).burnFrom(
			msg.sender,
			seniorBalance
		);

		(uint256 juniorPayback, uint256 juniorBalance) = calculateJuniorPayback(
			symbol,
			msg.sender
		);
		BaseFiTokenTemplate(fund.juniorToken).burnFrom(
			msg.sender,
			juniorBalance
		);

		uint256 totalPayback = seniorPayback + juniorPayback;
		require(totalPayback > 0, "No payback");

		IERC20 depositToken = IERC20(fund.depositToken);
		depositToken.transfer(msg.sender, totalPayback);

		emit Withdraw(
			symbol,
			msg.sender,
			totalPayback,
			seniorPayback,
			juniorPayback
		);
	}

	function calculateSeniorPayback(
		bytes32 symbol,
		address user
	) public view returns (uint256 seniorPayback, uint256 seniorBalance) {
		require(fundMap[symbol].symbol > 0, "Fund does not exist");

		Exit memory exit = exitMap[symbol];

		BaseFiTokenTemplate seniorToken = BaseFiTokenTemplate(
			fundMap[symbol].seniorToken
		);

		seniorBalance = seniorToken.balanceOf(user);
		seniorPayback = 0;
		if (seniorBalance > 0 && exit.seniorPayback > 0) {
			seniorPayback += SafeMath.div(
				SafeMath.mul(exit.seniorPayback, seniorBalance),
				exit.seniorSupply
			);
		}
	}

	function calculateJuniorPayback(
		bytes32 symbol,
		address user
	) public view returns (uint256 juniorPayback, uint256 juniorBalance) {
		require(fundMap[symbol].symbol > 0, "Fund does not exist");
		Exit memory exit = exitMap[symbol];

		BaseFiTokenTemplate juniorToken = BaseFiTokenTemplate(
			fundMap[symbol].juniorToken
		);

		juniorBalance = juniorToken.balanceOf(user);
		juniorPayback = 0;
		if (juniorBalance > 0) {
			juniorPayback += SafeMath.div(
				SafeMath.mul(exit.juniorPayback, juniorBalance),
				exit.juniorSupply
			);
		}
	}

	function _calculateAccruedInterest(
		uint256 principal,
		uint256 numOfDays,
		uint256 apy
	) private pure returns (uint256) {
		// Calculate daily interest rate in decimal form
		uint256 dailyInterestRate = (apy * 10 ** 18) / 365 days;

		// Calculate accrued interest
		uint256 accruedInterest = (principal * dailyInterestRate * numOfDays) /
			10 ** 18;

		return accruedInterest;
	}
}
