import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Menus from './pages/Menus';
import Carts from './pages/Carts';
import Orders from './pages/Orders';
import Land from './pages/Land';
import { auth } from './services/firebase';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import ourReducer from './store/reducer';
//const store = createStore(ourReducer);

const store = createStore(ourReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

global.api = 'https://pitapal.metis-data.site'
//global.api = 'http://localhost:3008';


function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/home' />}
    />
  )
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  render() {
    return this.state.loading === true ? <h2>Loading...</h2> : (
      <Provider store={ store }>
      <Router>
        <Switch>
          <Route exact path="/" component={Signup}></Route>
          <PrivateRoute path="/home" authenticated={this.state.authenticated} component={Home}></PrivateRoute>
          <PrivateRoute path="/menus" authenticated={this.state.authenticated} component={Menus}></PrivateRoute>
          <PrivateRoute path="/carts" authenticated={this.state.authenticated} component={Carts}></PrivateRoute>
          <PrivateRoute path="/order" authenticated={this.state.authenticated} component={Orders}></PrivateRoute>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
        </Switch>

      </Router>
      </Provider>
    );
  }
}

export default App;
