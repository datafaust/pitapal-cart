import React, { Component } from 'react';
import classes from './menuItem.module.css'
import { connect } from 'react-redux';

const menuItem = (props) => {


    
    //console.log('condiments...', props.condiments)
    //console.log(props.condimentCount)
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

export default menuItem;

