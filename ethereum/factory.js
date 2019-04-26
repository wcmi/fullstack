import  web3 from './web3';

import campaignfactor from './build/campaignfactor.json';
const instance = new web3.eth.Contract(JSON.parse(campaignfactor.interface),
  '0xb8dce01be1393cf489870e9c8d49684f35b2f985');

  export default instance;
