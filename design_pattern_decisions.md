## Design Pattern Decisions

The project implements a "Circuit Breaker / Emergency Stop" for the *Auction* contract using OpenZeppelin *Pausable* contract, 
[https://docs.openzeppelin.org/v2.3.0/api/lifecycle](). This was so that functions in the contract could be freezed up in the event of a bug once deployed.

The project also implements a "Mortal (Self Destruction)" for the *Auction* contract using OpenZeppelin *Ownable* contract, 
[https://docs.openzeppelin.org/v2.3.0/api/ownership](). This would help in destruction of the contract and sending all funds held to the owner of the contract.

Another pattern used if the "Checks-Effers-Interaction". It is placed to ensure that contract has finished execution and has no more dependency as it interacts with other contracts