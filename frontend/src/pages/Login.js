import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = () => {

    const history = useHistory();

    const onFinish = values => {
        fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: values.username,
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
        <Row type="flex" justify="center" style={{minHeight: '100vh'}}>
            <Col>
                <Card>
                    <Form
                        name="basic"
                        layout="vertical"
                        requiredMark="optional"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        validateMessages={validateMessages}
                        >
                        <Form.Item
                            name="username"
                            rules={[
                            {
                                required: true,
                                message: 'Nome de usuário: é necessário preencher o campo!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome de usuário" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: 'Senha: é necessário preencher o campo!',
                            },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Senha" />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                            offset: 8,
                            span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}