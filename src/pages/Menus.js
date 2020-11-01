import React, { Component } from 'react';
import Header from "../components/Header";
import MenuItem from '../components/MenuItem';
import classes from './menus.module.css'
import { auth, db } from "../services/firebase";
import { Container, Col, Row, Button, Table, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import CreateMenuModal from '../components/CreateMenuModal';

const moment = require("moment");

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            user: auth().currentUser,
            value: 'enter',
            condimentCount: 5,
            showMenu: false,
            showItem: false,
            createMenu: false,
            carts: null,
            cart_id: null,
            menu_name: null,
            meals:null,
            menus: null,
            menuAdded:false,
            menuItems: [
                {
                    //"id": 1237,
                    "cart_id": 1791,
                    "item_name": 'chicken with rice',
                    "category_id": 'meal',
                    "cart_description": 'halal chicken served with rice, salad and sauce',
                    "condiments": [{ id: 1, value: "white sauce", isChecked: false }, { id: 2, value: "red sauce", isChecked: false }, { id: 3, value: "green sauce", isChecked: false }, { id: 3, value: "salad", isChecked: false }],
                    "price": 6
                },
                {
                    //"id": 1239,
                    "cart_id": 1791,
                    "item_name": 'lamb with rice',
                    "category_id": 'meal',
                    "cart_description": 'halal lamb served with rice, salad and sauce',
                    "condiments": [{ id: 1, value: "white sauce", isChecked: false }, { id: 2, value: "red sauce", isChecked: false }, { id: 3, value: "green sauce", isChecked: false }, { id: 3, value: "salad", isChecked: false }],
                    "price": 6
                }
            ],
            condiments: [
                {
                    "id": 1234,
                    "condiment": "white sauce",
                    "price": 0
                }
            ],
            fruites: [
                { id: 1, value: "white sauce", isChecked: false },
                { id: 2, value: "red sauce", isChecked: false },
                { id: 3, value: "green sauce", isChecked: false },
                { id: 3, value: "salad", isChecked: false }

            ],
            //condiments: false,
            showCondiments: true
            //array:[1,2],

        };
        this.handleCategory = this.handleCategory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCart = this.handleCart.bind(this);
    }

    async componentDidMount() {
        this.getCarts();
        this.state.carts && this.getMenus()
        this.getMeals();
        
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.menuAdded !== prevState.menuAdded) {
            console.log(prevState.menuAdded, '?', this.state.menuAdded);
            console.log('menu was added********')
            this.getMenus();
        } else if (this.state.cart_id !== prevState.cart_id) {
            this.getMenus();
        }
    }


    //TOGGLE CREATE MENU MODAL 
    menuModalToggle = () => {
        this.setState({ showMenu: !this.state.showMenu });
    }

    //TOGGLE ADD ITEMS MODAL 
    itemsModalToggle = () => {
        console.log('changing items toggle show to: ', !this.state.showItem);
        this.setState({ showItem: !this.state.showItem });
    }

    //GET MEAL KEY ITEMS
    getMeals = async () => {
        console.log('retrieving all meals ...');
        let response = await fetch(`${global.api}/mealKey`)
            .then(res => res.json())
            .then(res => {
                console.log('Meals: ',res["data"])
                return res["data"]
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({ meals: response });
    }

    //CREATE A MENU
    createMenu = () => {
        console.log('create menu with:', this.state.cart_id, this.state.menu_name);
        this.setState({ showMenu: !this.state.showMenu, menuAdded: !this.state.menuAdded });
        let sqlStamp = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0, 18) + '0';
        fetch(
            `${global.api}/addMenu?cart_id=${this.state.cart_id}&menu_name=${this.state.menu_name}&time_joined=${sqlStamp}`,
            { method: "POST" }
        ).catch((error) => {
            console.log(error)
        })
    }


    sendMenuItems = () => {
        //console.log(this.state.menuItems);

        const output = this.state.menuItems.map(function (obj) {
            return Object.keys(obj).sort().map(function (key) {
                return obj[key];
            });
        });
        console.log(output);
        var body = JSON.stringify(output);

        this.state.menuItems.map(item => {
            //console.log('jsonstring', JSON.stringify(item.condiments))
            fetch(
                `${global.api}/addMenuItem?id=${item.id}&cart_id=${item.cart_id}&item_name=${item.item_name}&category_id=${1}&cart_description=${item.cart_description}&price=${item.price}&active=${1}&condiments=${JSON.stringify(item.condiments)}`,
                { method: "POST" }
            ).catch((error) => {
                console.log(error)
            })
        })

        this.setState({ showMenu: false })

    }



    handleAllChecked = (event) => {
        let fruites = this.state.fruites
        fruites.forEach(fruite => fruite.isChecked = event.target.checked)
        this.setState({ fruites: fruites })
    }

    handleCheckChieldElement = (event) => {
        let fruites = this.state.fruites
        fruites.forEach(fruite => {
            if (fruite.value === event.target.value)
                fruite.isChecked = event.target.checked
        })
        this.setState({ fruites: fruites })
    }

    handleCheck = (event, key) => {
        //copy all items
        let menuItems = [...this.state.menuItems];
        //extract the itemn we care about
        let item = { ...menuItems[key] };

        //MAPPING OVER EACH CONDIMENT IN THE COPY TO ASSIGN NEW VALUE
        item.condiments.forEach(condiment => {
            if (condiment.value === event.target.value)
                condiment.isChecked = event.target.checked
        })

        menuItems[key] = item;

        this.setState({ menuItems: menuItems })
        console.log(menuItems);
    }

    handleCategory = (event, key) => {
        console.log('changing meal type', event.target)
        //this.setState({value: event.target.value});

        // 1. Make a shallow copy of the items
        let items = [...this.state.menuItems];
        // 2. Make a shallow copy of the item you want to mutate
        let item = { ...items[key] };
        // 3. Replace the property you're intested in
        item.category_id = event.target.value;
        //4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
        items[key] = item;
        // 5. Set the state to our new copy
        this.setState({ menuItems: items });
    }

    showMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    addMenuItem = () => {
        //let value = this.state.menuItemCount + 1
        //this.setState({ menuItemCount: value });
        let menuItems = [...this.state.menuItems];
        // Add item to it
        menuItems.push({
            "id": 1236,
            "item_name": 'lamb with rice',
            "category_id": 'meal',
            "cart_description": 'halal lamb served with rice, salad and sauce',
            "price": 6
        });
        // Set state
        this.setState({ menuItems });
    }



    getMenus = async () => {
        console.log('retrieving menus with ...', this.state.cart_id);
        let response = await fetch(`${global.api}/menu/${this.state.cart_id}`)
            .then(res => res.json())
            .then(res => {
                console.log('Menu Data',res["data"])
                return res["data"]
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({ menus: response });


    }

    //PULL CART DATA IF NOT PRESENT IN REDUCER
    getCarts = async () => {

        if (this.props.reducer.carts === undefined || this.props.reducer.carts.length == 0 || this.props.reducer.carts == null) {
            let response = await fetch(`${global.api}/cart/${auth().currentUser.uid}`)
                .then(res => res.json())
                .then(res => {
                    console.log('no reducer so retrieving cart data: ', res["data"])
                    //console.log('id value:', res["data"][0].id)
                    this.setState({ cart_id: res["data"][0].id })
                    return res["data"]
                })
                .catch((error) => {
                    console.log(error)
                });
            this.setState({ carts: response, cart_id: response[0].id });
            this.props.setCart(response);

        } else {
            this.setState({ carts: this.props.reducer.carts, cart_id: this.props.reducer.carts[0].id });
        }
    }


    handleChange(event) {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleCart = (event) => {
        //console.log(event.currentTarget.value);
        console.log('category: ', event.target.value)
        //console.log('cart selected', this.state.cart_id);
        this.setState({ cart_id: event.target.value });
    }

    //DELETE MENU FROM DATABASE
    deleteMenu = async (id) => {
        console.log('menu is removed with key...', id);
        await fetch(
            `${global.api}/deleteMenu?id=${id}`,
            { method: "DELETE" }
        ).catch((error) => {
            console.log(error)
        })

        this.setState({ menuAdded: !this.state.menuAdded})
    }



    render() {
        //console.log('show modal? ', this.state.showMenu)
        console.log('Menu Data', this.state.menus);
        this.state.carts && console.log('carts data? ', this.state.carts);

        const addCondiment = () => {
            let value = this.state.condimentCount + 1
            this.setState({ condimentCount: value });
        }

        const deleteCondiment = () => {
            let value = this.state.condimentCount - 1
            this.setState({ condimentCount: value });
        }

        const deleteMenuItem = () => {
            let value = this.state.menuItemCount - 1
            this.setState({ menuItemCount: value });
        }

        const hasCondiments = () => {
            this.setState({ condiments: !this.state.condiments })
        }



        let menuItems = null;
        if (this.state.menuItems) {
            menuItems = (
                <div>
                    {
                        this.state.menuItems.map((item, i) => {
                            return <div key={i}>
                                <MenuItem
                                    key={item.id}
                                    item_name={item.item_name}
                                    category_id={item.category_id}
                                    addCondiment={addCondiment}
                                    deleteCondiment={deleteCondiment}
                                    addMenuItem={this.addMenuItem}
                                    deleteMenuItem={deleteMenuItem}
                                    hasCondiments={hasCondiments}
                                    condiments={this.state.condiments}
                                    nestedCondiments={item.condiments}
                                    showCondiments={this.state.showCondiments}
                                    condimentCount={this.state.condimentCount}
                                    fruites={this.state.fruites}
                                    handleAllChecked={this.handleAllChecked}
                                    handleCheckChieldElement={this.handleCheckChieldElement}
                                    handleCheck={e => this.handleCheck(e, i)}
                                    handleCategory={e => this.handleCategory(e, i)}
                                />
                            </div>
                        })
                    }
                </div>
            )
        }
        //console.log('my reducer data',this.state.menu_name)
        return (

            <Container>
                <Header />
               
                   { this.state.carts && <CreateMenuModal
                        showMenu = {this.state.showMenu}
                        menuModalToggle={this.menuModalToggle}
                        carts={this.state.carts}
                        handleChange={this.handleChange}
                        handleCart={this.handleCart}
                        createMenu={this.createMenu}
                        menu_name={this.state.menu_name}
                    />
                   }

                    {this.state.meals && <MenuItem 
                        showItem={this.state.showItem}
                        itemsModalToggle={this.itemsModalToggle}
                        carts={this.state.carts}
                        meals={this.state.meals}
                    />}

                    
                <div className={classes.summary}>
                    <div>Below you will see your listed menus for all carts you have registered in our system. Every cart is allowed one menu at the moment.</div>
                </div>
                <br/>
                
                <Row>
                    <Col>
                        <Button onClick={this.menuModalToggle}>
                            Create Menu
                </Button>

                    </Col>
                    <Col>
                        <Button onClick={() => this.getMenus()}>
                            Refresh Menu
                        </Button>
                    </Col>
                </Row>
                <br/>

                <Row>
                    <Col><h5>{this.state.carts && `Your Default Cart (id): ${this.state.carts[0].id}`}</h5></Col>
                </Row>
                <br/>
                
                {/**FORM TO CHOOSE YOUR CART */}
                <Row>
                    <Col>
                    {this.state.carts && <Form>
                        <Form.Group controlId="cart_select">
                            <Form.Label>Choose the cart you will customize:</Form.Label>
                            <Form.Control as="select" value={this.state.carts[0].id.toString()} defaultV={this.state.carts[0].id.toString()} onChange={this.handleCart}>

                                   {this.state.carts.map((cart,i) => <option key={cart.id} value={cart.id}>{cart.cart_name}</option>)})
                    
                            </Form.Control>
                        </Form.Group>
                    </Form>}
                    </Col>
                </Row>


                <h4 style={{ textAlign: "center", marginTop: '30px' }}>My Menus</h4>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Menu Id</th>
                            <th>Cart Name</th>
                            <th>Menu Name</th>
                            <th>Add Menu Items</th>
                            <th>Remove Menu</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            this.state.menus && this.state.menus.map((menu, i) => {
                                return <tr key={menu.id}>
                                    <td>{menu.id}</td>
                                    <td>{menu.cart_id}</td>
                                    <td>{menu.menu_name}</td>
                                    <td>
                                        <Button
                                            onClick={this.itemsModalToggle}
                                        >AddItems</Button>
                                    </td>
                                    <td>
                                        <Button
                                            onClick={() => this.deleteMenu(menu.id)}
                                        >Del Menu</Button>
                                    </td>
                                </tr>
                            })
                        }

                    </tbody>
                </Table>

                <h4 style={{ textAlign: "center", marginTop: '30px' }}>My Menu Items</h4>



                <div className={classes.summary}>
                    Click Add a Menu to add a new menu
                </div>
                <div className={classes.buttonContainer}>
                    <button onClick={this.showMenu} className={classes.addButton}>Add a Menu</button>
                </div>
                <div>
                </div>


            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const { reducer } = state
    return { reducer }
};


const mapDispachToProps = dispatch => {
    return {
        setCart: (y) => dispatch({ type: "CARTS", value: y }),
        storeMenu: (id,menu_name) => dispatch({ type: "STORE_MENU", value: id,value1: menu_name})
    };
}


export default connect(mapStateToProps,
    mapDispachToProps
)(Menu);




/**
 *
                <div>
                    {menuItems}
                </div>
                <div className={classes.buttonContainer}>
                    <button onClick={() => this.sendMenuItems()
                    }>Submit My Menu</button>
                </div>

                   getMenus = async () => {
        console.log('retrieving menus...');
        let response = await fetch(`${global.api}/menus`)
            .then(res => res.json())
            .then(res => {
                console.log('res', res["data"])
                return res["data"]
            })
            .catch((error) => {
                console.log(error)
            });
        this.setState({ menuItems: response })
    }

    <Row>
                    <Col><h5>{this.state.carts && `Your Default Cart (id): ${this.state.carts[0].id}`}</h5></Col>
                </Row>

    

 */