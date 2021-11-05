import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Input, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import { AuthContext } from "../App";
import '../styles/main.css';

const { Search } = Input;
const { Header, Footer, Content } = Layout;

export const Main = props => {

    const [categories, setCategories] = useState([])
    const { user, signOut } = useContext(AuthContext)

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
                setCategories(categories => [...categories, result.results[i]])
            }
        })
        .catch(error => console.log(error))
    }

    const createSubMenuItems = () => {
        const subMenuItems = []
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].subCategories.length > 0) {
                subMenuItems.push(
                    <Menu.SubMenu key={'sub'+categories[i].id} title={categories[i].name} style={{ fontFamily: "'Lucida Console', 'Courier New', monospace", textTransform: 'uppercase' }}>
                        {
                            categories[i].subCategories.map(subCategory => {
                                return (
                                    <Menu.Item key={subCategory.id} style={{ fontFamily: "'Lucida Console', 'Courier New', monospace", textTransform: 'uppercase' }}>{subCategory.name}</Menu.Item>
                                )
                            })
                        }
                    </Menu.SubMenu>
                )
            } else {
                subMenuItems.push(
                    <Menu.Item key={'sub'+categories[i].id} style={{ fontFamily: "'Lucida Console', 'Courier New', monospace", textTransform: 'uppercase' }}>{categories[i].name}</Menu.Item>
                )
            }
        }
        return subMenuItems
    }

    const onSearch = value => console.log(value);

    return (
        <Layout className="default-font-family">
            <div className="navbar-bg-color">
                <Row justify="space-between" className="navbar-contents-margin">
                    <Col>
                        <Space direction="vertical">
                            <Search placeholder="Buscar" allowClear onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </Col>
                    <Col>
                        <Link to="/">
                            <b className="text-website-name">E-COMMERCE</b>
                        </Link>
                    </Col>
                    <Col className="navbar-width">
                        {user === undefined ?
                            <Row>
                                <Col span={12}>
                                    <Link to="/register" className="text-color-black">
                                        CADASTRE-SE
                                    </Link>
                                </Col>
                                <Col span={2}>
                                    |
                                </Col>
                                <Col span={6}>
                                    <Link to="/login" className="text-color-black">
                                        LOGIN
                                    </Link>
                                </Col>
                                <Col span={2}>
                                    |
                                </Col>
                                <Col span={2} className="navbar-text">
                                    <ShoppingCartOutlined />
                                </Col>
                            </Row>
                            :
                            <Row>
                                <Col span={12} className="navbar-text">
                                    MINHA CONTA
                                </Col>
                                <Col span={2}>
                                    |
                                </Col>
                                <Col span={5} className="navbar-text" onClick={signOut}>
                                    SAIR
                                </Col>
                                <Col span={2}>
                                    |
                                </Col>
                                <Col span={3}>
                                    <Link to="/cart" className="text-color-black">
                                        <ShoppingCartOutlined />
                                    </Link>
                                </Col>
                            </Row>
                        }
                    </Col>
                </Row>
            </div>
            <Header style={{ background: "#FFFFFF" }}>
                <Menu className="menu-center" mode="horizontal" defaultSelectedKeys={['fixed1']}>
                    <Menu.Item key="fixed1">
                        <Link to="/">
                            INÍCIO
                        </Link>
                    </Menu.Item>
                    <Menu.SubMenu key="fixedSub1" title="PRODUTOS">
                        {
                            createSubMenuItems()
                        }
                    </Menu.SubMenu>
                    <Menu.Item key="fixed2">
                        <Link to="/">
                            CONTATO
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: "#FFFFFF"
                    }}
                >
                    {props.children}
                </Content>
            </Layout>
            <Footer style={{ backgroundColor: "#FFFFFF", textAlign: 'center' }}>E-COMMERCE ©2021 ALL RIGHTS RESERVED</Footer>
        </Layout>
    )
}