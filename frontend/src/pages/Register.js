import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';

export const Register = () => {

    const history = useHistory();

    const onFinish = values => {
        fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                first_name: values.first_name,
                last_name: values.last_name,
                password: values.password,
                password_confirm: values.password_confirm
            }),
        })
        .then(response => {
            if (response.status === 201) {
                fetch('http://127.0.0.1:8000/api-token-auth/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password
                    }),
                })
                .then(response => response.json())
                .then(result => {
                    localStorage.setItem('token', result.token)
                    history.push('/');
                })
                .catch(error => console.log(error))
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(error => console.log(error))
    };

    const onFinishFailed = errorInfo => {
        console.log('Erro:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    label="Nome de usuário"
                    name="username"
                    rules={[{ required: true, message: 'Insira o nome de usuário!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Insira o email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Primeiro nome"
                    name="first_name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Sobrenome"
                    name="last_name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[{ required: true, message: 'Insira a senha!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirmação"
                    name="password_confirm"
                    rules={[{ required: true, message: 'Insira a confirmação da senha!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Enviar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
