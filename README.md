# BaseFi

## Decentralized Lending on Base

BaseFi is a decentralized lending platform built on the Base blockchain. This repository contains the codebase for the platform and instructions for setting it up locally.

### Getting Started

#### Prerequisites

Make sure you have PNPM installed on your system. If not, you can install it by following the instructions [here](https://pnpm.io/installation).

#### Installation

1. Clone the repository to your local machine.
2. Navigate to the cloned directory.
3. Run the following command to install the necessary packages:

   ```bash
   pnpm init
   ```

#### Running Locally

Start the local development server by running:

```bash
pnpm dev
```

This will start a local server, and you can access the application in your web browser at `http://localhost:port`, where `port` is the port number on which the server is running.

### Smart Contracts

The main 2 contracts used in the project are deployed on:

- [BaseFi Fund Manager](https://goerli.basescan.org/address/0xad2b38f4f3237d6005b1cda5ecf50dd53973fdf5)
- [BaseFi USD](https://goerli.basescan.org/address/0x964b3DAA93084c73df5EC1ca280fe63b7f343364)

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

### Support

If you encounter any problems or have any questions, please open an issue on GitHub or contact the maintainers.

### Acknowledgments

- The BaseFi community and all contributors who make this project possible.

Happy coding!
