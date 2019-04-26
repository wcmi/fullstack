import  React , {Component} from  'react';

import {Form, Input,Button,Message} from 'semantic-ui-react'

import Campaign from '../ethereum/compagin'
import web3 from  '../ethereum/web3'

class  Contributefrom  extends  Component{
  state={
    value:'',
    errormessage:'',
    loading:''
  }
  onSubmit= async()=>{
    this.setState({errormessage:''});
    this.setState({loading:true});
    event.preventDefault();
    const campaign = Campaign(this.props.address);

    const account = await web3.eth.getAccounts();
    //console.log(account[0]);
    //console.log(this.props.address);
    try{
      //console.log(this.state.value);
          await campaign.methods.contribute().send({
          from:account[0],
          value:web3.utils.toWei(this.state.value,'ether')})


    }catch(error){
      this.setState({errormessage:error.message});
    }

    this.setState({loading:false});
  }

  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errormessage}>
        <Form.Field >
          <label>总投资额度</label>
          <Input
          value = {this.state.value}
          onChange={event=>this.setState({value:event.target.value})}
          label="ether" labelPosition='right'/>
        </Form.Field>
        <Message error  header="错误提示" content={this.state.errormessage} />
        <Button primary onSubmit={this.onSubmit}>投资</Button>
      </Form>
    )
  }

}
export  default  Contributefrom;
