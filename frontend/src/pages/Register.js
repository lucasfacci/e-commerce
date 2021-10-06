import { useState } from 'react';
import { useHistory } from "react-router-dom";

export const Register = () => {

    const history = useHistory();

    const [inputs, setInputs] = useState({});

    const handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        fetch('http://127.0.0.1:8000/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: inputs.username,
                email: inputs.email,
                first_name: inputs.first_name,
                last_name: inputs.last_name,
                password: inputs.password,
                password_confirm: inputs.password_confirm
            }),
        })
        .then(response => {
            if (response.status === 201) {
                fetch('http://127.0.0.1:8000/api-token-auth/', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: inputs.username,
                        password: inputs.password
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
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome de usuário:
                    <input
                        type="text"
                        name="username"
                        value={inputs.username || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email" 
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Primeiro nome:
                    <input
                        type="text" 
                        name="first_name"
                        value={inputs.first_name || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Sobrenome:
                    <input
                        type="text" 
                        name="last_name"
                        value={inputs.last_name || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Senha:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Confirmação:
                    <input
                        type="password"
                        name="password_confirm"
                        value={inputs.password_confirm || ""}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}