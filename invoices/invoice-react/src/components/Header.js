import React, { Component } from 'react';
import {BrowserRouter as Router, Link, NavLink} from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Header extends Component {
  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
           
        <Menu
          
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation</span>}>
            <MenuItemGroup title="Invoices">
            
              <Menu.Item key="setting:1">
              
                <NavLink to="/">
                  <span>To invoice list</span> 
                </NavLink>
              
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      
    );
  }
}