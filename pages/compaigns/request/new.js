import React,{Component} from 'react'
import {Link,Router} from '../../../routes'
import Layout from '../../../components/layout'
import {Form,Input,Button,Message} from 'semantic-ui-react'
import web3 from '../../../ethereum/web3'
import Campaign from '../../../ethereum/compagin'



class campaignrequestnew extends Component{

  static  async getInitialProps(props){
    const {address} = props.query;
    return {address};
  }

  state={
    description:'',
    errormessage:'',
    value:'',
    recipientaddress:'',

    loading:''
  };
  onSubmit = async()=>{
    event.preventDefault();
    const compaign = Campaign(this.props.address);
    const  accounts =  await  web3.eth.getAccounts();
    const {description,value, recipientaddress} = this.state;
    this.setState({loading:true});


    try{
        await compaign.methods.createrequest(description,web3.utils.toWei(value, "ether"),recipientaddress).send({
          from:accounts[0]
        });
        Router.pushRoute(`/compaigns/${this.props.address}/request`);
    }catch(error){
      this.setState({errormessage:error.message});
    }
    this.setState({loading:false});
  }
  render(){
    return(
      <Layout>
        <Link route={`/compaigns/${this.props.address}/request`} >
        <a>返回</a>
        </Link>
          <h3>创建你的众筹项目</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errormessage} >
            <Form.Field>
            <label>请求的描述</label>
            <Input
            value={this.state.description}
            onChange={event=>this.setState({description:event.target.value})}
            />
            </Form.Field>
            <Form.Field>
            <label>请求金额（ether）</label>
            <Input
            value={this.state.value}
            onChange={event=>this.setState({value:event.target.value})}
            />
            </Form.Field>

            <Form.Field>
            <label>受益人地址</label>
            <Input
            value={this.state.recipientaddress}
            onChange={event=>this.setState({recipientaddress:event.target.value})}
            />
            </Form.Field>

            <Message error header='There was some errors with your submission' content={this.state.errormessage} />
            <Button loading={this.state.loading} type='submit' primary>创建众筹</Button>
            </Form>

        </Layout>
    );

  }
}
export  default campaignrequestnew;
