// #region  H E A D E R
// <copyright file="navBarCart.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common JavaScript Template
 *      Module:   Modules (./navBarCart.js)
 *      Project:  MicroCODE Common Library
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     February 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE's Common JavaScript Template.
 *      This file is copied to start all MicroCODE JavaScript code files.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Style Guide
 *         https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2. AirBnB JavaScript Style Guide
 *         https://github.com/airbnb/javascript
 *
 *      3. Turing School Style Guide
 *         https://github.com/turingschool-examples/javascript/tree/main/es5
 *
 *      4. MDN Web Docs - JavaScript Classes
 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
 *
 *      5. JSDoc - How to properly document JavaScript Code.
 *         https://
 *
 *      6. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  03-May-2022   TJM-MCODE  {0001}    New module for a Shopping Cart App.
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S
const menuItems = [
    { name: "apple", instock: 2 },
    { name: "pineapple", instock: 3 },
    { name: "pear", instock: 0 },
    { name: "peach", instock: 3 },
    { name: "orange", instock: 1 },
];

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * NavBar() - writes out all items with their stock number
 * providing a button and the onClick event to move 1 item into the Shopping Cart
 * using React.useState to keep track of items in the Cart.
 *
 * @api public
 *
 * @param {type} menuitems the items .
 * @returns JSC code to render the Cart list.
 *
 * @example
 *
 *      NavBar('menuitems');
 *
 */
function NavBar({ menuitems })
{
    const { Button } = ReactBootstrap;
    const [stock, setStock] = React.useState(menuitems);
    const [cart, setCart] = React.useState([]);

    const moveToCart = (e) =>
    {
        let [name, num] = e.target.innerHTML.split(":");
        if (num <= 0) return; // zero items in stock

        // get item with name from stock and update stock
        let item = stock.filter((item) => item.name == name);

        // check if its in stock ie item.instock > 0
        let newStock = stock.map((item) =>
        {
            if (item.name == name)
            {
                item.instock--;
            }
            return item;
        });

        // now filter out stock items == 0;
        setStock([...newStock]);
        setCart([...cart, ...item]); // for now don't worry about repeat items in Cart
        console.log(`Cart: ${ JSON.stringify(cart) }`);
    };

    const updatedList = menuitems.map((item, index) =>
    {
        return (
            <Button key={ index } onClick={ moveToCart }>
                { item.name }:{ item.instock }
            </Button>
        );
    });

    // note that React needs to have a single Parent
    return (
        <>
            <ul key="stock" style={ { listStyleType: "none" } }>
                { updatedList }
            </ul>
            <h1>Shopping Cart</h1>
            <Cart cartitems={ cart }> Cart Items</Cart>
        </>
    );
}

/**
 * Cart() – description of public method.
 *
 * @api public
 *
 * @param {object} cartitems items currently in the cart
 * @returns JSC code to render the Cart list.
 *
 * @example
 *
 *      Cart('cartitems');
 */
function Cart({ cartitems })
{
    const { Card, Button } = ReactBootstrap;
    console.log("rendering Cart");
    const updatedList = cartitems.map((item, index) =>
    {
        return <Button key={ index }>{ item.name }</Button>;
    });
    return (
        <ul style={ { listStyleType: "none" } } key="cart">
            { updatedList }
        </ul>
    );
}

// #endregion

// #region  M E T H O D S – P R I V A T E

// #endregion

// #region  M E T H O D - E X P O R T S

// #endregion

// #region  R E A C T

ReactDOM.render(
    <NavBar menuitems={ menuItems } />,
    document.getElementById("root")
);

// #endregion

// #endregion
// #endregion