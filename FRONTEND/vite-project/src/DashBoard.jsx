import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import SubMenu from 'antd/es/menu/SubMenu';
import Head from './Components/Head';
import axios from 'axios';
import Cookies from 'js-cookie'
const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }
// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];
const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const access = Cookies.get("access")
  const userId = Cookies.get("user")

  const [userData, setuserData] = useState();

  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:3344/api/users/find/${userId}`, {
      headers: {
        token: `Bearer ${access}`
      }
    });
    setuserData(res.data)
  }

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId])

  console.log(userData);

  return (
    <div>
      <div><Head /></div>
      <Layout
        style={{
          minHeight: '90.2vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}

          >
            <Menu.Item icon={<UserOutlined />} key={"1"}>
              <Link to={"/"}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />} key={"2"}>
              <Link to={"/product"}>Products</Link>
            </Menu.Item>
            {
              userData?.isAdmin && (
                <>
                  <Menu.Item icon={<UserOutlined />} key={"3"}>
                    <Link to={"/users"}>User</Link>
                  </Menu.Item>
                </>
              )
            }

            <Menu.Item icon={<UserOutlined />} key={"4"}>
              <Link to={"/orders"}>orders</Link>
            </Menu.Item>
            <Menu.Item icon={<UserOutlined />} key={"5"}>
              <Link to={"/carts"}>Carts</Link>
            </Menu.Item>
            {
              userData?.isAdmin && (
                <>
                  <Menu.Item icon={<UserOutlined />} key={"6"} >
                    <Link to={"/adminpage"}>Admin Page</Link>
                  </Menu.Item>
                </>
              )
            }
          </Menu>
        </Sider>
        <Layout>
          {/* <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          /> */}
          <Content
            style={{
              // margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                // margin: '16px 0',
              }}
            >
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 0,
                minHeight: 360,
                background: "",
                // borderRadius: borderRadiusLG,
              }}
              className='bg-gray-500 h-[100%]'>


              <Outlet />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              color: 'white',

            }}
            className='bg-blue-950'          >
            ©{new Date().getFullYear()} Created by Danish Ali
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashBoard;