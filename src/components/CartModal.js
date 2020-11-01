import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const CartModal = (props) => {

    return (
        <div>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Your Cart</Modal.Title>
                    </Modal.Header>
                    <div style={{ textAlign: 'center', padding: 10 }}>
                        Please enter details about your cart. When you submit your cart you will be prompted to check the location of cart to make sure it's accurate. You can always edit your cart later.
                    </div>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="cart_name">
                                <Form.Label>Enter the name of your cart:</Form.Label>
                                <Form.Control 
                                    onChange={props.handleChange} 
                                    value={props.cart_name} 
                                    name="cart_name" 
                                    placeholder="Hassan's Halal Truck" 
                                />
                            </Form.Group>
                            <Form.Group controlId="cart_address">
                                <Form.Label>Enter the address of your cart:</Form.Label>
                                <Form.Control 
                                    onChange={props.handleChange} 
                                    value={props.cart_address}
                                    name="cart_address"
                                    placeholder="23-48 Broadway" 
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Select the city your cart is in:</Form.Label>
                                <Form.Control as="select">
                                    <option>New York</option>
                                    <option>Philadelphia</option>
                                    <option>Boston</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="zip_code">
                                <Form.Label>Enter your zip code:</Form.Label>
                                <Form.Control type="zip" placeholder="11106" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.addCart}>Close</Button>
                        <Button variant="primary" onClick={props.checkLocation}>Verify Cart Location</Button>
                    </Modal.Footer>
                </Modal.Dialog>
        </div>
    )
}

export default CartModal;
