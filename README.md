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
5. Copy content of `build/contract/Auction.json` to `src/components/pages/Auction.json`

6. Start project locally
    ```javascript
    npm start
    ```

## How to Use the dApp

- Log in with uPort (You will need the mobile app if you don't have it already)
- Upon log in, click on the link that says `Click here if you logged in freshly or you feel your data is lagging`
- Beneficiary carries the owner of the contract
- Ensure the account under `Your Account` reflects your own address
- `From Account` lists all accounts attached to your account. You can swap between any to place a bid with.
- `Bid Amount` takes in integers in ethers as bid
-  A low bid will trigger an alert. A low bid is big lower or equal to Highest Bid
-  Once you are ready to place a bid, click on the the `bid` button

## Notes of Importance

- Ensure the same instance of ganache-cli is running during the entire lifecycle of the application
- If you see `Loading...` for more than 1 second, you will need to click on the link that says `Click here if you logged in freshly or you feel your data is lagging`. If that doesn't clear it, your deployed contract may be unaccessible

## Test

To run test, simply run `truffle test` 