import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Row, Col, Input, Space } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import '../styles/main.css';

const { Search } = Input;
const { Header, Footer, Content } = Layout;

export const Main = props => {

    const [categories, setCategories] = useState([]);

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
                    <Menu.SubMenu key={ 'sub'+categories[i].id } title={ categories[i].name }>
                        {
                            categories[i].subCategories.map(subCategory => {
                                return <Menu.Item key={ subCategory.id }>{ subCategory.name }</Menu.Item>
                            })
                        }
                    </Menu.SubMenu>
                )
            } else {
                subMenuItems.push(
                    <Menu.Item key={ 'sub'+categories[i].id }>{ categories[i].name }</Menu.Item>
                )
            }
        }
        return subMenuItems
    }

    const onSearch = value => console.log(value);

    return (
        <Layout>
            <div style={{ backgroundColor: '#fff' }}>
                <Row justify="space-between" style={{ margin: '3%' }}>
                    <Col>
                        <Space direction="vertical">
                            <Search placeholder="Buscar" allowClear onSearch={onSearch} style={{ width: 200 }} />
                        </Space>
                    </Col>
                    <Col>
                        <Link to="/">
                            <b style={{ fontSize: "20px", color: "black" }}>E-commerce</b>
                        </Link>
                    </Col>
                    <Col style={{ width: 200 }}>
                        <Row>
                            <Col span={13}>
                                <Link to="/register" style={{ color: "black" }}>
                                    Cadastre-se
                                </Link>
                            </Col>
                            <Col span={8}>
                                <Link to="/login" style={{ color: "black" }}>
                                    Login
                                </Link>
                            </Col>
                            <Col span={3}>
                                <Link to="/" style={{ fontSize: "16px", color: "black" }}>
                                    <ShoppingCartOutlined />
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Header style={{ background: "#fff" }}>
                <Menu className="menu-center" mode="horizontal" defaultSelectedKeys={['fixed1']} style={{ borderBottom: 0 }}>
                    <Menu.Item key="fixed1">
                        <Link to="/">
                            Início
                        </Link>
                    </Menu.Item>
                    <Menu.SubMenu key="fixedSub1" title="Produtos">
                        {
                            createSubMenuItems()
                        }
                    </Menu.SubMenu>
                    <Menu.Item key="fixed2">
                        <Link to="/">
                            Contato
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