
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
//import "./header.css";
import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
// import {Link} from 'react-router-dom'
//import classes from './navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class Header extends Component {
  render() {
    return (
      <div>

        {auth().currentUser
          ? 
            <Navbar className="fixed-top" collapseOnSelect expand="lg" style={{ backgroundColor: '#485671' }} variant="dark">
              <Navbar.Brand href="#home">PitaPal</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">

                

                  <Link className="nav-item nav-link" to="/home">Home</Link>
              <Link className="nav-item nav-link" to="/carts">Manage my Carts</Link>
              <Link className="nav-item nav-link" to="/menus">Manage my Menus</Link>
              <Link className="nav-item nav-link" to="/orders">Order Queue</Link>
              <Link className="nav-item nav-link" to="/">Contact Us</Link>



                </Nav>
                <Nav>
                <Button onClick={() => auth().signOut()} variant="outline-success">Sign Out</Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        
          : 
            <Navbar className="fixed-top" collapseOnSelect expand="lg" style={{ backgroundColor: '#485671' }} variant="dark">
              <Navbar.Brand href="#home">PitaPal</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Sign Up</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="contact">Contact Us</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        }





      </div>
    )
  }
}

export default Header;



/**
 *
 *     <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-custom">
        <Link className="navbar-brand" to="/">PitaPal</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/home">Home</Link>
              <Link className="nav-item nav-link" to="/carts">Manage my Carts</Link>
              <Link className="nav-item nav-link" to="/menus">Manage my Menus</Link>
              <Link className="nav-item nav-link" to="/orders">Order Queue</Link>
              <Link className="nav-item nav-link" to="/">Contact Us</Link>
              <button className="btn btn-primary" onClick={() => auth().signOut()}>Logout</button>
            </div>
            : <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/login">Sign In</Link>
              <Link className="nav-item nav-link" to="/signup">Sign Up</Link>
            </div>}
        </div>
      </nav>
    </header>
 */