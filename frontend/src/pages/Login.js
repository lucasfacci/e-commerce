import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import '../styles/login.css';

export const Login = () => {

    const history = useHistory();

    const onFinish = values => {
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
                throw new Error('Something went wrong');
            }
        })
        .then(result => {
            localStorage.setItem('token', result.token)
            history.push('/');
        })
        .catch(error => console.log(error))
    }

    const onFinishFailed = errorInfo => {
        console.log('Erro:', errorInfo);
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} é necessário preencher o campo!',
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
                            type: 'email',
                            message: 'É necessário preencher este campo!'
                        },
                        ]}
                    >
                        <Input prefix={<MailOutlined style={{ color: "#B3B3B3" }} className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'É necessário preencher este campo!',
                        },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined style={{ color: "#B3B3B3" }} className="site-form-item-icon" />} placeholder="Senha" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Acessar
                        </Button>
                        Não possui uma conta? <Link to="/register">Cadastre-se!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}