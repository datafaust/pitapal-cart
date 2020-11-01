import React, { Component } from 'react';
import classes from './menuItem.module.css'
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';


class MenuItem extends Component {
    render() {
        console.log('SELECT ID: ',this.props.carts[0].id);
        console.log('MEAL ITEMS: ', this.props.meals);
        return (
            <Modal
            //dialogClassName={classes.modal}
            show={this.props.showItem}
            onHide={this.props.itemsModalToggle}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Menu Items</Modal.Title>
                </Modal.Header>
                <div style={{ textAlign: 'center', padding: 10 }}>
                    Add items to the menu you have selected to customize this menu. We currently alloew up to 10 items per menu not including drink selections.
                </div>
                <Modal.Body>
                <div>Menu Item No: 1</div>
                <Form>
                    <Form.Group controlId="meal_check">
                        <Form.Label>Meal Item (e.g. combo over rice, lamb gyro):</Form.Label>
                        <Form.Control
                            as="select"
                            value={this.props.meals[0].id.toString()}
                            defaultValue={this.props.meals[0].id.toString()}
                            onChange={this.props.handleCart}
                        >
                            
                            {this.props.meals.map((meal, i) => (
                                <option key={meal.id} value={meal.id}>
                                    {meal.meal}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                <div>Menu Item No: 2</div>
                <Form>
                    <Form.Group controlId="meal_check">
                        <Form.Label>Meal Item (e.g. combo over rice, lamb gyro):</Form.Label>
                        <Form.Control
                            as="select"
                            value={this.props.meals[0].id.toString()}
                            defaultValue={this.props.meals[0].id.toString()}
                            onChange={this.props.handleCart}
                        >
                            
                            {this.props.meals.map((meal, i) => (
                                <option key={meal.id} value={meal.id}>
                                    {meal.meal}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
                    

                </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.itemsModalToggle}>Cancel</Button>
                    <Button variant="primary" onClick={()=>console.log('Submit Items')}>Add Menu</Button>
                </Modal.Footer>
     
            </Modal>
        );
    }
}

export default MenuItem;

