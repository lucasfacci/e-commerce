import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';

export const Login = () => {

    const history = useHistory();

    const onFinish = values => {
        console.log(values)
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

    return (
        <div>
            <Form
                name="basic"
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
                >
                <Form.Item
                    label="Nome de usuário"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Insira o nome de usuário!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Insira a senha!',
                    },
                    ]}
                >
                    <Input.Password />
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
        </div>
    )
}