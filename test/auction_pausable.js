const Auction = artifacts.require("./Auction.sol");

contract('Pausable Auction', function (accounts) {
  const 
    Owner = accounts[0],
    Bidder = accounts[1];

  it("...should not increased bid once paused", function () {
    let error = false
    return Auction.deployed().then(async function (instance) {
      auctionInstance = instance;
      let receipt = await auctionInstance.pause({ from: Owner });
      assert.equal(receipt.logs[0].event, 'Paused',
      'should have emitted the Paused event on pause');
    }).then(function () {
      return auctionInstance.bid.call({ from: Owner, value: 3 });
    })
    .catch(() => {
      error = true;
      assert.equal(error, true, 'Error thrown since contract is paused')
    })
  });

  it("...should return paused is false", function () {
    return Auction.deployed().then(async function (instance) {
      auctionInstance = instance;
      let receipt = await auctionInstance.unpause({ from: Owner });
      assert.equal(receipt.logs[0].event, 'Unpaused',
      'should have emitted the Unpaused event on unpause');
     return auctionInstance.paused({ from: Owner });
    }).then(function (paused) {
      assert.equal(paused, false, 'Contract is unpaused')
    })
  });

  it("...should return throw error and not pause", function () {
    return Auction.deployed().then(async function (instance) {
      auctionInstance = instance;
      let receipt = await auctionInstance.pause({ from: Bidder });
      return receipt;
    })
    .catch(error => {
      assert.equal(error.reason, 'PauserRole: caller does not have the Pauser role')
    })
  });
})