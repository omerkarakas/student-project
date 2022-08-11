import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Empty, Layout, Menu, Table, Spin, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getAllStudents } from './client';
import React from 'react';

import './App.css';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    filterSearch: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    filterSearch: true,
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    filterSearch: true,
  },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('ue');
    setLoading((ld) => true);
    const fetchStudents = async () => {
      setStudents(await getAllStudents());
      setLoading((ld) => false);
    };

    fetchStudents();
  }, []);

  // if (students.length < 1) {
  //   return 'no data yet';
  // }

  const renderStudents = () => {
    if (loading) {
      return (
        <Space size="middle">
          <Spin size="large" />
        </Space>
      );
    }
    if (students.length < 1) {
      return <Empty />;
    }
    return (
      <Table
        dataSource={students}
        columns={columns}
        bordered
        title={() => 'Students'}
        footer={() => 'Footer'}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 240 }}
        rowKey={'id'}
      />
    );
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {renderStudents()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          By OKarakas Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
