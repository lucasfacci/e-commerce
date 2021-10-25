import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Main } from "./pages/Main";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Category } from "./pages/Category";

export const AuthContext = createContext({});

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, [user]);

  const signIn = values => {
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
      setUser({
        token: result.token,
        user_id: result.user_id,
        first_name: result.first_name
      })
      localStorage.setItem('token', result.token)
    })
    .catch(error => console.log(error))
  }

  const logout = () => {
    setUser({})
    localStorage.clear()
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signIn }}>
        <Switch>
          <Route exact path="/">
            <Main>
              <Home />
            </Main>
          </Route>
          <Route path="/register">
            <Main>
              <Register />
            </Main>
          </Route>
          <Route path="/login">
            <Main>
              <Login />
            </Main>
          </Route>
          <Route path="/category">
            <Main>
              <Category />
            </Main>
          </Route>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
