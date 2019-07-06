import React from 'react'
import { connect } from 'react-redux'
import AuctionContract from "./Auction.json";
import getWeb3 from "../util/getWeb3";



class Dashboard extends React.Component {
  state = { web3: null, accounts: null, contract: null, 
    beneficiary: null, highestBid: null, highestBidder: null,
  balance: null};
  componentDidMount = async () => {
    try { 
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    const accouintBal = await web3.eth.getBalance(accounts[0]);
    const accountBalInEther = await web3.eth.utils.fromWei(`${accouintBal}`, 'ether');
    const networkId = await web3.eth.net.getId();
      const deployedNetwork = AuctionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        AuctionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      this.setState({ web3, accounts, contract: instance, balance: accountBalInEther}, this.getDetails)
      console.log('deployed address', deployedNetwork.address.substr(0,12))
      console.log(this.state.accounts)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }
  getDetails = async () => {
    const { contract }= this.state;

    const beneficiary = await contract.methods.beneficiary().call();
    const biddingTime = await contract.methods.biddingTime().call();
    const highestBid = await contract.methods.highestBid().call();
    const highestBidder = await contract.methods.highestBidder().call();
    this.setState({beneficiary, biddingTime: Number(biddingTime), highestBid: Number(highestBid), highestBidder});
  }
  render() {
    const authData = this.props.authData;
    const { name, verified } = authData || {}
    console.log('DASHBOARD RENDERING', authData);
    const {accounts, beneficiary, highestBid, highestBidder, biddingTime, balance} = this.state;
    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <p><strong>Congratulations {name}!</strong> with address {this.state.accounts} If you're seeing this page, you've logged in with uPort successfully.</p>
          <p>Here are the verifications you've shared with this app:</p>
          <p>Change the data displayed here by updating the <code>verified</code> property in the argument to <code>requestDisclosure</code> in <code>src/components/util/LoginButton.js</code></p>
          <div className="row">
            <div className="column">
              <label>Beneficiary</label>
              <blockquote><p><em id="beneficiary">{beneficiary ? beneficiary.substr(0, 12) : "Loading.."}</em><br /><br /></p></blockquote>
            </div>
            <div className="column">
              <label>Raised</label>
              <blockquote><p><em><span id="raised">0</span><br />ETH</em></p></blockquote>
            </div>
            <div className="column">
              <label>Timeleft</label>
              <blockquote><p><em id="timeleft">{biddingTime ? biddingTime : "Loading.."}</em><br />seconds</p></blockquote>
            </div>
            <div className="column">
              <label>Highest Bidder</label>
              <blockquote><p><em><span id="highestBidder">{highestBidder ? highestBidder.substr(0, 12) : ""}</span><br />
                <span id="highestBid">{highestBid ? highestBid : 0 }</span> ETH</em></p></blockquote>
            </div>
            <div className="column">
              <label>Your Account</label>
              <blockquote><p><em id="accountAddress">{this.state.accounts ? this.state.accounts[0].substr(0, 12) : "Loading.."}</em><br /><br /></p></blockquote>
            </div>
            <div className="column">
              <label>Balance</label>
              <blockquote><p><em id="accountBalance">{balance ? balance : "Loading.."}</em><br />ETH</p></blockquote>
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="column column-33">
              <label>From Account</label>
              {/* <select id="bidAccount"> */}
                <Option accounts={accounts}/>
              {/* </select> */}
            </div>
            <div className="column column-25">
              <label>Bid Amount</label>
              <input type="number" id="bidAmount" placeholder="28300 ether" />
            </div>
            <div className="column column-25">
              <label><br /></label>
              <button id="makeBid">Bid</button>
            </div>
          </div>

          <hr />

          <button id="endAuction" disabled="disabled">End Auction</button>

          <br /><br />

          <div id="response"></div>

          {/* {verified && verified.map((attestation) =>
          <AttestationCard {...attestation} />
        )} */}
        </div>
      </div>
    )
  }
}

const Option = ({accounts}) => (
  <select>
  {accounts.forEach((address) => {
  <option value={address}>{address}</option>})}
  </select>
)
const AttestationCard = ({ claim, iss, sub }) => (
  <div className="card">
    <h4>subject: <code>{sub}</code></h4>
    <h4>issuer: <code>{iss}</code></h4>
    <ExpandJSON obj={claim} />
  </div>
)

const ExpandJSON = ({ obj }) => {
  return (
    <ul className="key">
      {Object.keys(obj).map((key) => (
        <li><b>{key}: </b>
          {
            (Array.isArray(obj[key]))
              ? '[' + obj[key].map((item) => <ExpandJSON obj={item} />) + ']'
              : (typeof obj[key] === 'object')
                ? <ExpandJSON obj={obj[key]} />
                : obj[key]
          }
        </li>
      ))}
    </ul>
  )
}



export default connect(
  (state) => ({
    authData: state.user.data
  })
)(Dashboard)
