const  hdwalletprovider=require('truffle-hdwallet-provider');
const  Web3=require('web3');

const campaignfactor =require('./build/campaignfactor.json');
const provider = new  hdwalletprovider(
  'route unlock whisper wool teach stage heart right flash task rare vapor',
  'https://ropsten.infura.io/v3/8cc11aa020044b9f9873a9fccd6d0e18');


const web3= new Web3(provider);

const deploy =async()=>{
  //console.log(interface);
  const accounts = await web3.eth.getAccounts();
  console.log('attamp to deploy contract',accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(campaignfactor.interface)).deploy({data:'0x'+campaignfactor.bytecode})
  .send({from:accounts[0],gas:'1000000'});
  console.log('contract deploy to ',result.options.address);
}
deploy();
