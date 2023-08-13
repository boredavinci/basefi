// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseFiTokenTemplate is ERC20, Ownable, ERC20Burnable {
	uint256 private _max_supply;
	bool private _is_senior;

	constructor(
		string memory name,
		string memory symbol,
		uint256 __maxSupply,
		bool __isSenior
	) ERC20(name, symbol) {
		_max_supply = __maxSupply;
		_is_senior = __isSenior;
	}

	function isSenior() public view returns (bool) {
		return _is_senior;
	}

	function maxSupply() public view returns (uint256) {
		return _max_supply;
	}

	function setMaxSupply(uint256 max_supply) public onlyOwner {
		require(
			maxSupply() >= totalSupply(),
			"Max supply must be greater than total supply"
		);
		_max_supply = max_supply;
	}

	function mint(address to, uint256 amount) public onlyOwner {
		require(totalSupply() + amount <= maxSupply(), "Max supply exceeded");
		_mint(to, amount);
	}

	function burnFrom(
		address account,
		uint256 amount
	) public override onlyOwner {
		_burn(account, amount);
	}
}
