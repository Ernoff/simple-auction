## Avoiding Common Attacks

Auction contract was checked for security flaws using truffle-security package, solhint and solidity extension for vscode. All of which confirmed that common attacks like Re-entrancy was handled. 
Reentrancy loophole was handled during development and restructured to be secure.
Pending balances were set to zero in case a reversal of bid occured
  ``` javascript
   pendingReturns[msg.sender] = 0;
  ```