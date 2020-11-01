import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Carousel, Container, Row, Col, ResponsiveEmbed } from "react-bootstrap";
import {
  auth,
  //db 
} from "../services/firebase";
import { Link } from 'react-router-dom';
import classes from "./home.module.css";

//IMAGES FOR SIDE BY SIDE
import cart from '../assets/street-food.png';
import menu from '../assets/menuRound.png';
import serve from '../assets/food-tray.png';

//IMAGES FOR CAROUSEL
import carousel1 from '../assets/cart-carousel1.jpg';
import carousel2 from '../assets/cart-carousel2.jpg';
import carousel3 from '../assets/cart-carousel3.jpg';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser
    };
  }

  componentDidMount() {
    console.log('user: ', auth().currentUser)
  }

  render() {
    return (
      <Container md="fluid">
        <Header />
        <div className="container-fluid">
          <div className="float-md-right">
            You are logged in as: <strong>{this.state.user.email}</strong>
          </div>
          <br />

          {/*CAROUSEL*/}
          <Carousel className={classes.carousel}>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src={carousel1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src={carousel1}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src={carousel1}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>

          <br />



          {/*HOW DO I GET STARTED*/}

          <Row>
            <Col><h5 style={{ textAlign: "center" }}><u>How do I get Started?</u></h5></Col>
          </Row>
          <br/>
          <Row>
            <p>
              Joining our PitaPal network is a way to boost your food sales by offering online order for takeout. Now that you have made an account with us, simply add your carts, corresponding menus and start taking orders right away. Below we offer an introductory video on the process. We are always available to help our partners get their operations running so if you have any questions contact us at the contact page.
            </p>
          </Row>
          <br/>

          <Row>
            <Col>

              <Link to="/carts">
                <img src={cart} class="img-fluid mx-auto d-block" alt="Responsive image" />
              </Link>
              <br/>
              <p className="text-center">Enter information on your halal cart and add them to our network.</p>

            </Col>
            <Col>
              <Link to="/menus">
                <img src={menu} class="img-fluid mx-auto d-block" alt="Responsive image" />
              </Link>
              <br/>
              <p className="text-center">Create and upload your online menu.</p>

            </Col>
            <Col>
              <Link to="/orders">
                <img src={serve} class="img-fluid mx-auto d-block" alt="Responsive image" />
              </Link>
              <br/>
              <p className="text-center">Start receiving orders and prepping for takeout.</p>
            </Col>
          </Row>



          <br />


          {/*WATCH A VIDEO*/}
          <br />


          <div style={{ width: '70%', height: 'auto', margin: "auto" }}>
            <ResponsiveEmbed aspectRatio="16by9">
              <embed type="image/svg+xml" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
            </ResponsiveEmbed>
          </div>



        </div>



        <Footer />
      </Container>
    );
  }
}
