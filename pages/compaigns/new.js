import React,{Component} from 'react';
import Layout from '../../components/layout';
import { Button, Form ,Input,Message} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import factory from  '../../ethereum/factory';
import {Router}  from '../../routes';
class compaignsindex extends Component{
  state = {
    mininum:'',
    errormessage:'',
    loading:''
  };

  onSubmit = async()=>{
    this.setState({errormessage:''});
    this.setState({loading:true});
    // 错误处理 error 处理  try catch
    try{
    event.preventDefault();
    const account = await web3.eth.getAccounts();
    await factory.methods.createcampaign(this.state.mininum).send({from:account[0]});
    //Router.pushRoute('/');
    Router.pushRoute('/');
  }catch(err){
    this.setState({errormessage:err.message});
  }
  this.setState({loading:false});
  }
  render(){
    console.log(this.state.mininum);
    return (
      <Layout>
          <h3>创建你的众筹项目</h3>

      <Form onSubmit={this.onSubmit} error={!!this.state.errormessage} > /*// form 表单中添加error*/
  <Form.Field>
    <label>请输入最小贡献量</label>
    <Input label="wei" labelPosition='right'
      value={this.state.mininum}
      onChange={event=>this.setState({mininum:event.target.value})}
      />
  </Form.Field>
  <message error header='There was some errors with your submission' content={this.state.errormessage} />
  <Button loading={this.state.loading} type='submit' primary>创建众筹</Button>
  </Form>
</Layout>
    );

  }

}

export default compaignsindex;
