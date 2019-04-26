import React  from 'react';
import Layout from '../../components/layout'
import Campaign from '../../ethereum/compagin'
import { Card ,Grid,Button} from 'semantic-ui-react';
import  Contributefrom from '../../components/contributefrom'
import web3  from '../../ethereum/web3'
import  {Link} from '../../routes'


class Compaignshow extends  React.Component{


  static async getInitialProps(props){

    const  campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getsummary().call();
    //console.log(summary);
    return {
      address:props.query.address,
      mininumcontributes:summary[0],
      balance:summary[1],
      requestcount:summary[2],
      approvelcount:summary[3],
      manager:summary[4]
    };
  }

  rendercards(){
    const {
      address,
      mininumcontributes,
      balance,
      requestcount,
      approvelcount,
      manager
    }=this.props;
    const item = [
      {
        header: manager,
        description: '当前管理者创建了众筹',
        meta: '管理者地址',
        style:{overflowWrap:'break-word'}
      }
      ,
      {
        header: mininumcontributes,
        description: '你投资的金额需要大于当前金额',
        meta: '最小共享量',
        style:{overflowWrap:'break-word'}
      },
      {
        header: requestcount,
        description:
          '要想取钱，必须征求大于50%投资人同意',
        meta: '请求数量',
        style:{overflowWrap:'break-word'}
      },
      {
        header: approvelcount,
        description: '已经投资人数量',
        meta: '投资人数量',
        style:{overflowWrap:'break-word'}
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        description:
          'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
        meta: '总筹金额',
        style:{overflowWrap:'break-word'}
      },

    ];
    return <Card.Group items={item} />


  }

  render(){

    return(
    <Layout>
        <h1>众筹显示</h1>
        <Grid>
        <Grid.Row>
        <Grid.Column width={10}>
        {this.rendercards()}
</Grid.Column>
          <Grid.Column width={6}>
        <Contributefrom address={this.props.address}/>
          </Grid.Column>
          </Grid.Row>

          <Grid.Row>
          <Grid.Column >
      <Link route={`/compaigns/${this.props.address}/request`}>
      <a>
      <Button primary>查看请求</Button>
      </a>
      </Link>
        </Grid.Column >
          </Grid.Row>
          </Grid>
    </Layout>
  );
  }
}

export default   Compaignshow;
