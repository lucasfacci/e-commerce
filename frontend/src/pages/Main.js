import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import '../styles/main.css';
const { Header, Footer, Sider, Content } = Layout;

export const Main = props => {

    const [list, setList] = useState([]);

    useEffect(() => {
        listCategories()
    }, [])

    const listCategories = () => {
        fetch('http://localhost:8000/categories/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(result => {
            for (let i = 0; i < result.results.length; i++) {
                setList(list => [...list, result.results[i].name])
            }
        })
        .catch(error => console.log(error))
    }

    const createMenuItems = () => {
        const menuItems = []
        for (let i = 0; i < list.length; i++) {
            menuItems.push(
                <Menu.Item key={i}>
                    <Link to="/category">
                        {list[i]}
                    </Link>
                </Menu.Item>
            )
        }
        return menuItems
    }

    return (
        <Layout>
            <div style={{ background: "#fff", textAlign: "center" }}>
                <Link to="/">
                    <b style={{ fontSize: '20px', color: "black" }}>E-commerce</b>
                </Link>
            </div>
            <Header style={{ background: "#fff" }}>
                <Menu className="menu-center" mode="horizontal" style={{ borderBottom: 0 }}>
                    <Menu.Item key="1">
                        <Link to="/">
                            Início
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        Produtos
                    </Menu.Item>
                    <Menu.Item key="3">
                        Contato
                    </Menu.Item>
                    <Menu.Item key="4" style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Link to="/login">
                            Login
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Sider width={200}>
                    <Menu
                        mode="inline"
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        {
                            createMenuItems()
                        }
                    </Menu>
                </Sider>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: "#fff"
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
            <Footer style={{ backgroundColor: "#fff", textAlign: 'center' }}>E-commerce ©2021 All rights reserverd</Footer>
        </Layout>
    )
}