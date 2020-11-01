import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import classes from './menuItem.module.css';

const menuItem = (props) => {


    let condiments = null;
    if (props.showCondiments == true) {
        condiments = (
            <div>
                {
                    props.condiments.map((condiment, i) => {
                        return <div key={i}>
                            <div className={classes.condiment}>
                                <div>condiment</div>
                                <input type="text" name="condiment" value={condiment.condiment} />
                                <div>price:</div>
                                <input type="text" pattern="[0-9]*" name="condiment" value={condiment.price} />
                                <button onClick={props.addCondiment}>Add</button>
                                <button onClick={props.deleteCondiment}>Remove</button>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }

    return (
        <div className={classes.cards}>
            <div className={classes.buttonContiner}>
                <button onClick={props.addMenuItem}>Add</button>
                <button onClick={props.deleteMenuItem}>Remove</button>
            </div>
            <div className={classes.items}>
                <form>
                    <label>
                        Meal Item (e.g. combo over rice, lamb gyro):
                    <input type="text" name="item" value={props.item_name} />
                    </label>
                </form>

                <form>
                    <label>
                        What kind of meal item is this (e.g. meal, drink, side):
                        <select value={props.category_id} onChange={props.handleCategory}>
                            <option value="meal">meal</option>
                            <option value="drink">drink</option>
                            <option value="side">side</option>
                        </select>
                    </label>

                </form>
                


                <div>Please edit and add any condiments you may have below. We allow up to 5 condiments</div>
            </div>
            <div className={classes.condimentsBox}>
                {
                    props.fruites.map((fruite, i) => {
                        return (
                            <div key={i}>
                              
                                    <input key={fruite.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={fruite.value} /> {fruite.value}
                                
                            </div>
                        )
                    })
                }
            </div>

            <div className={classes.condimentsBox}>
                {
                    props.nestedCondiments.map((condiment, i) => {
                        return (
                            <div key={i}>
                              
                                    <input key={condiment.id} onClick={props.handleCheck} type="checkbox" checked={props.isChecked} value={condiment.value} /> {condiment.value}
                                
                            </div>
                        )
                    })

                }
            </div>





        </div>
    )
}



const CreateMenuModal = (props) => {

    return (
        <div>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Create Menu</Modal.Title>
                </Modal.Header>
                <div style={{ textAlign: 'center', padding: 10 }}>
                    Use the following to create a menu for your cart. Choose from a list of your carts. Then add menu items below. To make things easier we have created a list of selected items. Choose the ones that best apply. If you have additions add them into the comment box. As of now carts are allowed to advertize up to 5 meals.
                    </div>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Choose which cart this menu is for:</Form.Label>
                            <Form.Control as="select" value={props.carts} onChange={()=>console.log('change item')}>
                                <option value="1">Fausto's Truck 1</option>
                                <option value="2">Fausto's Truck 2</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="cart_choice">
                            <Form.Label>Enter the address of your cart:</Form.Label>
                            <Form.Control
                                onChange={() => console.log('he;;p')}
                                value={'hello'}
                                name="cart_address"
                                placeholder="23-48 Broadway"
                            />
                        </Form.Group>
                        <div>
                            {menuItem}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.toggleMenuCreate}>Close</Button>
                    <Button variant="primary" onClick={props.checkLocation}>Verify Cart Location</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default CreateMenuModal;
