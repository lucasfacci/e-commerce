import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';

import { AuthContext } from "../App";

export const Register = () => {

    const [form] = Form.useForm();
    const history = useHistory();
    const { user, signIn } = useContext(AuthContext)

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
        .then(() => {
            signIn(values)
            history.push('/')
        })
        .catch(error => console.log(error))
    };

    const onFinishFailed = errorInfo => {
        console.log('Erro:', errorInfo);
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'Este campo é obrigatório!',
        types: {
            email: 'O email inserido não é válido!',
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
                        label="Email:"
                        name="email"
                        rules={[
                            { required: true, type: 'email' }
                        ]}
                    >
                        <Input placeholder="ex.: seunome@email.com" />
                    </Form.Item>

                    <Form.Item
                        label="Nome:"
                        name="first_name"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sobrenome:"
                        name="last_name"
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Senha:"
                        name="password"
                        hasFeedback
                        rules={[
                            { required: true }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirmação:"
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
                        
                                    return Promise.reject(new Error('As senhas não correspondem!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                            Cadastre-se
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
