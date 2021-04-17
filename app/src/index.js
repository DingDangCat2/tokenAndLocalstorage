import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter,Redirect,Route,Switch,} from 'react-router-dom';
import Home from './Home';

ReactDOM.render(
<BrowserRouter>
<Switch>
<Route path='/login' exact component={App}></Route>
  <Route path='/'  component={Home}>
  </Route>
</Switch>
    </BrowserRouter>
,
  document.getElementById('root')
);

