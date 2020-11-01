
import React from 'react';
import { 
    Button,
     Card,
    Image } from 'react-bootstrap'
import classes from './cart.module.css'
import edit from '../assets/edit.png';
import remove from '../assets/delete.png';
import menu from '../assets/menu.png';




const cards = (props) => {

    return (
  
        <Card className={classes.cards}>
            <div className={classes.layout}>
            <Card.Img variant="top" src={props.image} style = {{width:'20%', height:'20%', alignItems: 'center', marginTop:'7%'}}/>
                
                <Card.Body className={props.textClass} style = {{color:'black'}}>
                    <Card.Title className={classes.cartName}>{props.cart_name}</Card.Title>
                    <Card.Text>
                        {props.address}
                    </Card.Text>
                    <Card.Text>
                        {props.active == 1 ? <p style={{color:'green'}}>Open</p> : <p style={{color:'red'}}>Closed</p>}
                    </Card.Text>
                </Card.Body>
                <div className={classes.buttonContainer}>
                    <Image onClick={()=>console.log('editing info')} src={edit} rounded />
                    <Image onClick={()=>props.deleteCart(props.id)} src={remove} rounded />
                    <Image onClick={()=>console.log('Manage Menu')} src={menu} rounded />
                </div>


            </div>
                
        </Card>
   
    )
}

export default cards;



/**
<Card.Img variant="top" src={props.image} style = {props.image1}/>
*/