
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { AuthContext } from "../App";

export const Login = () => {

    const history = useHistory();
    const { user, signIn } = useContext(AuthContext)

    useEffect(() => {
        if (user !== undefined) {
            history.push('/')
        }
    })

    const onFinish = values => {
        if (user === undefined) {
            signIn(values)
        }
        history.push('/');
    }

    const onFinishFailed = errorInfo => {
        console.log('Erro:', errorInfo);
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'É NECESSÁRIO PREENCHER ESTE CAMPO!',
        types: {
            email: 'O EMAIL INSERIDO NÃO É VÁLIDO!',
        },
    };

    return (
        <Row justify="center">
            <Col style={{ width: 400 }}>
                <Form
                    name="basic"
                    layout="vertical"
                    requiredMark="optional"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    validateMessages={validateMessages}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: 'email'
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined style={{ color: "#B3B3B3" }} className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined style={{ color: "#B3B3B3" }} className="site-form-item-icon" />} placeholder="Senha" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            ACESSAR
                        </Button>
                        NÃO POSSUI UMA CONTA? <Link to="/register">CADASTRE-SE!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}