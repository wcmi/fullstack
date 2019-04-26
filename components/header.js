import React from 'react';

import {Link} from '../routes'
import { Menu } from 'semantic-ui-react'
export default ()=> {


    return (
      <Menu style={{marginTop:'10px'}}>
        <Menu.Item name='browse'  >
        <Link route='/'>
        <a>
          Browse
          </a>
          </Link>
        </Menu.Item>


        <Menu.Menu position='right'>
          <Menu.Item name='signup'  >
          <Link route='/'><a>
            众筹</a>
            </Link>
          </Menu.Item>

          <Menu.Item name='help' >
          <Link route='/compaigns/new'><a>
            +</a>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )

}
