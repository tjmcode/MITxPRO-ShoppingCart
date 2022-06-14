// #region  H E A D E R
// <copyright file="ShoppingCart.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MIT xPRO React Shopping Cart
 *      Module:   Modules (./ShoppingCart.js)
 *      Project:  React Shopping Cart
 *      Customer: MIT xPRO
 *      Creator:  MicroCODE Incorporated
 *      Date:     June 2022
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
 *      This module implements MicroCODE's React Shoping Cart.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      ---------------------
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
 *  13-Jun-2022   TJM-MCODE  {0001}    New module for MIT xPRO WEEK 19.
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

// simulate getting products from DataBase
const products = [
    {name: "Apples", country: "Italy", cost: 3, instock: 10},
    {name: "Oranges", country: "Spain", cost: 4, instock: 3},
    {name: "Beans", country: "USA", cost: 2, instock: 5},
    {name: "Cabbage", country: "USA", cost: 1, instock: 8},
];

const photos = ["apple.png", "orange.png", "beans.png", "cabbage.png"];

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * ShoppingCart() – description of the public component.
 *
 * @api public
 *
 * @param {type} props component properties.
 *
 * @returns JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      ShoppingCart(props);
 *
 */
const ShoppingCart = (props) =>
{
    // valid PROPS input(s)

    // initialize STATE and define acessors...
    const {Card, Accordion, Button} = ReactBootstrap;

    // access CONTEXT for reference...
    let data = props.location.data ? props.location.data : products;

    console.log(`data:${JSON.stringify(data)}`);

    // #region  P R I V A T E   F U N C T I O N S

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // #endregion

    // perform component COMPUTATION to generate output


    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return <Accordion defaultActiveKey="0">{list}</Accordion>;
};


/*
 * useDataApi() -- call a server for a data list.
 */
const useDataApi = (initialUrl, initialData) =>
{
    const {useState, useEffect, useReducer} = React;
    const [url, setUrl] = useState(initialUrl);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    console.log(`useDataApi called`);

    useEffect(() =>
    {
        console.log("useEffect Called");
        let didCancel = false;

        const fetchData = async () =>
        {
            dispatch({type: "FETCH_INIT"});
            try
            {
                const result = await axios(url);
                console.log("FETCH FROM URL");

                if (!didCancel)
                {
                    dispatch({type: "FETCH_SUCCESS", payload: result.data});
                }
            }
            catch (error)
            {
                if (!didCancel)
                {
                    dispatch({type: "FETCH_FAILURE"});
                }
            }
        };

        fetchData();

        return () =>
        {
            didCancel = true;
        };

    }, [url]);

    return [state, setUrl];
};

/*
 *
 */
const dataFetchReducer = (state, action) =>
{
    switch (action.type)
    {
        case "FETCH_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

/*
 *
 */
const Products = (props) =>
{
    const [items, setItems] = React.useState(products);
    const [cart, setCart] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const {
        Card,
        Accordion,
        Button,
        Container,
        Row,
        Col,
        Image,
        Input,
    } = ReactBootstrap;

    //  Fetch Data
    const {Fragment, useState, useEffect, useReducer} = React;
    const [query, setQuery] = useState("http://localhost:1337/api/products");
    const [{data, isLoading, isError}, doFetch] = useDataApi(
        "http://localhost:1337/api/products",
        {
            data: [],
        }
    );

    console.log(`Rendering Products ${JSON.stringify(data)}`);

    // adds an item to the Cart
    const addToCart = (e) =>
    {
        let name = e.currentTarget.name;
        let instock = e.currentTarget.max;

        console.log(`name=${name} instock=${instock}`);

        // check if its in stock ie item.instock > 0
        if (instock <= 0) return; // zero items in stock

        // get item with name from stock and update stock
        let item = items.filter((item) => item.name == name);

        console.log(`Adding Item to Cart: ${JSON.stringify(item)}`);

        let newItems = items.map((item) =>
        {
            if (item.name == name)
            {
                item.instock--;
            }
            return item;
        });

        setItems([...newItems]);
        setCart([...cart, ...item]);

        doFetch(query);
    };

    // delete item from Cart, adds back to stock
    const deleteCartItem = (index) =>
    {
        let name = cart[index].name;

        console.log(`name=${name} index=${index}`);

        // get item with name from stock and update stock
        let item = items.filter((item) => item.name == name);

        console.log(`Returning Item to Stock: ${JSON.stringify(item)}`);

        let newItems = items.map((item) =>
        {
            if (item.name == name)
            {
                item.instock++;
            }
            return item;
        });

        setItems([...newItems]);

        let newCart = cart.filter((item, i) => index != i);

        setCart(newCart);
    };

    let list = items.map((item, index) =>
    {
        let n = index + 1049;
        let url = "https://picsum.photos/id/" + n + "/50/50";

        return (
            <li key={index}>
                <Image src={photos[index % 4]} width={70} roundedCircle></Image>
                <Button variant="primary" size="large">
                    {item.name} Cost ${item.cost} Available: {item.instock}
                </Button>
                <br />
                <input name={item.name} max={item.instock} type="submit" value="Add to Cart" onClick={addToCart}></input>
            </li>
        );
    });

    let cartList = cart.map((item, index) =>
    {
        return (
            <Card key={index}>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={1 + index}>
                        {item.name}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse
                    onClick={() => deleteCartItem(index)}
                    eventKey={1 + index}
                >
                    <Card.Body>
                        ${item.cost} from {item.country}  [ Click to remove ]
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    });

    let finalList = () =>
    {
        let total = checkOut();
        let final = cart.map((item, index) =>
        {
            return (
                <div key={index} index={index}>
                    {item.name}
                </div>
            );
        });
        return {final, total};
    };

    const checkOut = () =>
    {
        let costs = cart.map((item) => item.cost);
        const reducer = (accum, current) => accum + current;
        let newTotal = costs.reduce(reducer, 0);
        console.log(`total updated to ${newTotal}`);
        return newTotal;
    };

    const leaveStore = () =>
    {
        setCart([]);
        checkOut();
    };

    // Connect to our StrapiDB API and get a fresh list of products
    const restockProducts = (url) =>
    {
        doFetch(url);

        let newItems = data.map((item) =>
        {
            let {name, country, cost, instock} = item;
            return {name, country, cost, instock};
        });
        setItems([...items, ...newItems]);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Product List</h1>
                    <ul style={{listStyleType: "none"}}>{list}</ul>
                </Col>
                <Col>
                    <h1>Cart Contents</h1>
                    <Accordion>{cartList}</Accordion>
                </Col>
                <Col>
                    <h1>CheckOut </h1>
                    <Button onClick={leaveStore}>CheckOut ${finalList().total}</Button>
                    <div> {finalList().total > 0 && finalList().final} </div>
                </Col>
            </Row>
            <Row>
                <form
                    onSubmit={(event) =>
                    {
                        restockProducts(`http://localhost:1337/api/${query}`);
                        console.log(`Restock called on ${query}`);
                        event.preventDefault();
                    }}
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <br />
                    <button type="submit">ReStock Products</button>
                </form>
            </Row>
        </Container>
    );
};

// #endregion

// #region  C O M P O N E N T - E X P O R T S

if (typeof module !== 'undefined')
{
    module.exports = {ShoppingCart};
}

// #region  R E A C T

ReactDOM.render(<Products />, document.getElementById("root"));

// #endregion

// #endregion
// #endregion