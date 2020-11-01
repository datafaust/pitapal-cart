import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../helpers/auth';
import classes from './login.module.css';

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <div>

        <div className={classes.title}>PitaPal</div>

      <div className="container">
        <form className="py-5 px-5" autoComplete="off" onSubmit={this.handleSubmit}>
          <p className="lead">Welcome back</p>
          <div className="form-group">
            <input className="form-control" placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div className="form-group">
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button className={classes.login}>Login</button>
          </div>
          <hr></hr>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p>Frogot your password? <Link to="/signup">Frogot my password</Link></p>
        </form>
      </div>



      </div>
    )
  }
}

//className="btn btn-primary rounded-pill px-5"