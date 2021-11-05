import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Form, Input, Button, Row, Col } from 'antd';

import { AuthContext } from "../App";

export const Register = () => {

    const [form] = Form.useForm();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState(null)
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        if (user !== undefined) {
            history.push('/')
        }
    })

    const onFinish = values => {
        fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                password: values.password,
                password_confirm: values.password_confirm
            }),
        })
        .then(response => {
            if (response.status === 201) {
                return response.json()
            } else {
                setErrorMessage('O EMAIL INSERIDO JÁ ESTÁ EM USO!')
                throw new Error('Something went wrong')
            }
        })
        .then(() => {
            fetch('http://localhost:8000/api-token-auth/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                }),
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    setErrorMessage('EMAIL E/OU SENHA INVÁLIDO(S)!')
                    throw new Error('Something went wrong')
                }
            })
            .then(result => {
                setUser({
                    token: result.token,
                    user_id: result.user_id,
                    first_name: result.first_name
                })
                localStorage.setItem('token', result.token)
                localStorage.setItem('user_id', result.user_id)
                localStorage.setItem('first_name', result.first_name)
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    };

    const onFinishFailed = errorInfo => {
        console.log('Erro:', errorInfo);
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'ESTE CAMPO É OBRIGATÓRIO!',
        types: {
            email: 'O EMAIL INSERIDO NÃO É VÁLIDO!',
        },
    };

    return (
        <Row justify="center">
            <Col style={{ width: 400 }}>
                <Form
                    form={form}
                    layout="vertical"
                    name="register"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        remember: true
                    }}
                    validateMessages={validateMessages}
                    scrollToFirstError
                    >
                    <Form.Item
                        label="EMAIL:"
                        name="email"
                        rules={[
                            { required: true, type: 'email' }
                        ]}
                    >
                        <Input placeholder="ex.: seunome@email.com" />
                    </Form.Item>

                    <Form.Item
                        label="NOME:"
                        name="first_name"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="SOBRENOME:"
                        name="last_name"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="SENHA:"
                        name="password"
                        hasFeedback
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="CONFIRMAÇÃO:"
                        name="password_confirm"
                        hasFeedback
                        dependencies={['password']}
                        rules={[
                            {
                            required: true
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('AS SENHAS INSERIDAS NÃO CORRESPONDEM!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    {errorMessage !== null &&
                        <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: '25px' }} />
                    }
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            CADASTRE-SE
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
