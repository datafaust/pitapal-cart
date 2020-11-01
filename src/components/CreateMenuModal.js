import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import classes from './menuItem.module.css';


const CreateMenuModal = (props) => {
    console.log('props carts there?', props.carts);
    //console.log(props.menu_name)
    //console.log('cart id first: ', props.carts[0].id)
    return (
        <Modal
            //dialogClassName={classes.modal}
            show={props.showMenu}
            onHide={props.menuModalToggle}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create Menu</Modal.Title>
            </Modal.Header>
            <div style={{ textAlign: 'center', padding: 10 }}>
                Fill out the following details to create menus for your cart. Once you create a menu you will have the option to add and remove items from that menu.
                    </div>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="cart_check">
                        <Form.Label>Choose which cart this menu is for:</Form.Label>
                        <Form.Control
                            as="select"
                            value={props.carts[0].id.toString()}
                            defaultValue={props.carts[0].id.toString()}
                            onChange={props.handleCart}
                        >
                            
                            {props.carts.map((cart, i) => (
                                <option key={cart.id} value={cart.id}>
                                    {cart.cart_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="menu_name">
                        <Form.Label>Enter a name for your menu:</Form.Label>
                        <Form.Control
                            required placeholder="My Menu" name="menu_name" type="email" onChange={props.handleChange} value={props.menu_name}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.menuModalToggle}>Cancel</Button>
                <Button variant="primary" onClick={props.createMenu}>Add Menu</Button>
            </Modal.Footer>

        </Modal>

    )
}

export default CreateMenuModal;


/**
 *


 */