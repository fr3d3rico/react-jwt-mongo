import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

const Login = lazy(() => import('./components/login/LoginComponent'));
const Register = lazy(() => import('./components/register/RegisterComponent'));
const PageNotFound = lazy(() => import('./components/pagenotfound/PageNotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Login}/>
          
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>

          <Route path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
