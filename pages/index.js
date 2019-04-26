import React,{Component} from 'react';
import factory from '../ethereum/factory';
import  Layout from '../components/layout'

import { Card,Button,Container } from 'semantic-ui-react'

import {Link} from '../routes'


class Compaindex extends Component{
//    async componentDidMount(){
//      const  compaign = await  factory.methods.getdeploycampaign().call();
//      console.log(compaign);
//    }

  static async getInitialProps()  {
    const compaign = await  factory.methods.getdeploycampaign().call();
    return {compaign};
  }

  rendercampaign(){
    const items = this.props.compaign.map(address =>{
      return {
        header:address,
        description:<Link route={`/compaigns/${address}`}><a>查看众筹</a></Link>,
        fluid:true
      }

    });
    return <Card.Group items={items}/>;
  }
    render(){
      return (
  <Layout>
        <div>


        <h3>众筹列表</h3>

        <Link route='/compaigns/new'><a>
        <Button floated = 'right' content='create crowd-funding' icon='add circle' labelPosition='right' primary /></a>
        </Link>
        {this.rendercampaign()}


        </div>
          </Layout>

      )
    };
}
export default Compaindex;
