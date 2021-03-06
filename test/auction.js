const Auction = artifacts.require("./Auction.sol");

contract('Auction', function (accounts) {
  
  it("...should increase highest bid to 3", function () {
    return Auction.deployed().then(function (instance) {
      auctionInstance = instance;

      return auctionInstance.bid({ from: accounts[0], value: 3 });
    }).then(function () {
      return auctionInstance.highestBid.call();
    }).then(function (highestBid) {
      assert.equal(highestBid, 3, "The highest bid was not increased");
    });
  });

  it("...should reflect highest bidder from this address", function () {
    return Auction.deployed().then(function (instance) {
      auctionInstance = instance;
      return auctionInstance.bid({ from: accounts[0], value: 4 });
    }).then(function () {
      return auctionInstance.highestBidder.call();
    }).then(function (highestBidder) {
      assert.equal(highestBidder, accounts[0], "The highest bidder changed");
    });
  });

  it("...should throw error bid too low", function () {
    return Auction.deployed().then(function (instance) {
      auctionInstance = instance;
      return auctionInstance.bid({ from: accounts[0], value: 3 });
    })
    .catch((error) => {
     assert.equal(error.reason, 'Bid is too low')
    })
  });

  it("...should throw error auction in progress", function () {
    return Auction.deployed().then(function (instance) {
      auctionInstance = instance;
      return auctionInstance.auctionEnd({ from: accounts[0]});
    })
    .catch((error) => {
     assert.equal(error.reason, 'Auction is still in progress')
    })
  });
});
