const  assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const  web3 = new  Web3(ganache.provider());

const campaignfactor = require('../ethereum/build/campaignfactor.json');
const compilecampaign =require('../ethereum/build/campaign.json');

var accounts;
var factory;
var  camapaignaddress;
var campaign;

beforeEach(async()=>{
  accounts = await  web3.eth.getAccounts();
  factory = await  new web3.eth.Contract(JSON.parse(campaignfactor.interface))
  .deploy({data:'0x'+campaignfactor.bytecode}).send({from:accounts[0],gas:'1000000'});
  await factory.methods.createcampaign('100').send({from:accounts[0],gas:'1000000'});

  [camapaignaddress] = await factory.methods.getdeploycampaign().call();
  campaign = await new web3.eth.Contract(JSON.parse(compilecampaign.interface),camapaignaddress);

})

describe('campaign', ()=>{
  it('deploy a   factory and camapaign',()=>{
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })

  it('manager addree',async()=>{
    const manager = await campaign.methods.manager().call();
    assert(manager,accounts[0]);
  })
  it('allow people to contribute ',async()=>{
    await campaign.methods.contribute().send({from:accounts[1],value:200});
    const iscontribute= campaign.methods.approvers(accounts[1]).call();
    assert(iscontribute);
  })

  it('request a mininum contribute', async()=>{
    try{
      await campaign.methods.contribute().send({from:accounts[1],value:10});
      const iscontribute= campaign.methods.approvers(accounts[1]).call();
      assert(iscontribute);
    }catch(err){
        assert(err);
    }
  })
  it('allow a manager to make request', async()=>{
    await campaign.methods.createrequest('buy per','100',accounts[1]).send({
      from:accounts[0],
      gas:'1000000'
    });
    const request = await campaign.methods.requests(0).call();
    assert.equal('buy per', request.description);
  })
})
