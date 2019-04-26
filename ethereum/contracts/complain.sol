pragma solidity ^0.4.24;

contract  campaignfactor{
    address[] public deploycampaign;
    function createcampaign(uint mininum) public{
        address localcampaign = new campaign(mininum, msg.sender);
        deploycampaign.push(localcampaign);
    }
    function getdeploycampaign() public view returns (address[]){
        return  deploycampaign;
    }
}


contract campaign{
  struct request{
  string description;
  uint value;
  address recipients;
  bool  complete;
  uint approvelcount;
  mapping(address=>bool) approvers;
  }

  request[] public requests;
  address public  manager;
  uint public mininumcontributes;
  mapping(address=>bool) public approvers;
  uint public approverscount;
  modifier restricted{
    require(msg.sender==manager);
    _;
  }
  constructor(uint mininum, address _address) public {
    manager = _address;
    mininumcontributes = mininum;
  }
  function contribute() public    payable{
    require(msg.value> mininumcontributes);
    approvers[msg.sender] = true;
    approverscount ++;
  }
  function createrequest(string _description, uint _value, address  _add) public restricted {
      request memory newrequest = request({
        description:_description,
        value:_value,
        recipients:_add,
        complete:false,
        approvelcount:0
      });
      requests.push(newrequest);
  }

  function approverequest(uint index) public{
  request storage localrequest = requests[index];
  require(approvers[msg.sender]);
  require(!localrequest.approvers[msg.sender]);
  localrequest.approvers[msg.sender] = true;
  localrequest.approvelcount++;
  }

  function finalizrequest(uint index)   public restricted payable{
    request storage localrequest = requests[index];
    require(localrequest.approvelcount> mininumcontributes/2);
    localrequest.recipients.transfer(msg.value);
    localrequest.complete = true;
  }

  function getsummary() public view  returns(uint, uint , uint , uint , address){
    return  (mininumcontributes,address(this).balance, requests.length, approverscount,manager);
  }
    function getrequest() public view  returns(uint){
      return requests.length;
  }
}
