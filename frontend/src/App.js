import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Main } from "./pages/Main";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Category } from "./pages/Category";
import { Contact } from './pages/Contact';
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";

export const AuthContext = createContext({});

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("token")
    const userId = localStorage.getItem("user_id")
    const userFirstName = localStorage.getItem("first_name")

    if (userToken !== null && userId !== null && userFirstName !== null) {
      let isLogged = false
      
      fetch('http://localhost:8000/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + userToken
        }
      })
      .then(response => {
        if (response.status === 200) {
          isLogged = true
        }
      })
      .then(() => {
        if (isLogged === true) {
          setUser({
            token: userToken,
            user_id: userId,
            first_name: userFirstName
          })
        } else {
          setUser()
          localStorage.clear()
        }
      })
      .catch(error => console.log(error))
    } else {
      setUser()
      localStorage.clear()
    }
  }, []);

  const signOut = () => {
    setUser()
    localStorage.clear()
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, setUser, signOut }}>
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
          <Route path="/contact">
            <Main>
              <Contact />
            </Main>
          </Route>
          <Route path="/cart">
            <Main>
              <Cart />
            </Main>
          </Route>
          <Route path="/product">
            <Main>
              <Product />
            </Main>
          </Route>
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
