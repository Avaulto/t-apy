import React from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
const SideMenu = () => {
    return (
        <ProSidebar collapsed={true}>
        <Menu iconShape="square">
          <MenuItem >Dashboard</MenuItem>
          
            <MenuItem>Component 2</MenuItem>

        </Menu>
      </ProSidebar>
    )
}

export default SideMenu
