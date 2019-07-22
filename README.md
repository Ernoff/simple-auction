# Simple Auction with React uport box

This is a simple auction sample proof of concept project. It is powered by solidity, react, redux and uport for user authentication  

## Global Packages

Ensure you have the following installed
1. Ganache
2. Truffle
3. MetaMask(optional)

## Set up locally

1. Rename `.env.sample` to `.env` and `.secret.sample` to `.secret`

2. At the root of the project, install package.json
    ```javascript
    npm install
    ```
3. Start gananche-cli to initialize local testnet
    ```javascript
    ganache-cli
    ```
4. Deploy contract directly. This will compile and migrate the contracts 
    ```javascript
    truffle deploy 
    ```
    - If you choose to run them seperately you can do `truffle compile` followed by `truffle migrate --network development`

    NB: Setup for ropsten is included but to deploy to ropsten, add you Ropsten ID to `.env` and your key phrase to `.secret`
5. Copy content of `build/contract/Auction.json` to `/src/components/pages/Auction.json`

6. Start project locally
    ```javascript
    npm start
    ```

## Notes of Importance

- Ensure the same instance of ganache-cli is running during the entire lifecycle of the application

## Test

To run test, simply run `truffle test` 