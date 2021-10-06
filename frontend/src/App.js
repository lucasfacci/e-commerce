import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Main } from "./pages/Main";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Category } from "./pages/Category";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
