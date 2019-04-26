
import React,{Component} from 'react';
import {Link} from '../../../routes'
import {Button,Table} from 'semantic-ui-react'
import Layout from '../../../components/layout'
import Campaign from '../../../ethereum/compagin'
import RequestRow  from '../../../components/RequestRow'

class Campaignrequest  extends  Component{

  static  async getInitialProps(props){
    const {address} = props.query;//const address = props.query.address;
    const  campaign = Campaign(address);
    const requestCount =await campaign.methods.getrequest().call();
    const  approvelcount =await campaign.methods.approverscount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index)=>{
        return  campaign.methods.requests(index).call();
      })
    )
    console.log(requests);
    return {address,requests,approvelcount};
  }

  renderrow(){
    return this.props.requests.map((request,index)=>{
      return (
        <RequestRow
          key={index}
          id = {index}
          request={request}
          address={this.props.address}
          approvelcount = {this.props.approvelcount}
        ></RequestRow>
      );
    });
  }
  render(){
    const {HeaderCell, Row, Header} = Table;
    return (
      <Layout>

    <h1>请求列表</h1>
    <Link route={`/compaigns/${this.props.address}/request/new`}>
    <Button primary>增加请求</Button>
    </Link>

    <Table >
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>id</Table.HeaderCell>
      <Table.HeaderCell>描述</Table.HeaderCell>
      <Table.HeaderCell>金额</Table.HeaderCell>

      <Table.HeaderCell>受益人地址</Table.HeaderCell>
      <Table.HeaderCell>同意数量</Table.HeaderCell>
      <Table.HeaderCell>是否同意</Table.HeaderCell>
      <Table.HeaderCell>是否完成</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {this.renderrow()}
  </Table.Body>


</Table>

    </Layout>
  );
  }
}

export  default  Campaignrequest;
