import React, {Component} from 'react';
import {Router} from "@reach/router";
import Items from "./Items";
import Item from "./Item";
import Login from "./Login";

class App extends Component {
    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        // Get everything from the API
        this.getItems().then(() => console.log("Items received!"));
    }

    async getItems() {
        let url = `${this.API_URL}/items`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            items: json
        })
    }

    getItem(id) {
        const item = this.state.items.find(q => q.id === parseInt(id));
        return item;
    }

    async postBid(id, text) {
        console.log("postBid", id, bid);
        const url = `http://localhost:8080/api/items/${id}/bid`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                bid: bid
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);

        this.getItems();
    }

    async addItem(id) {
        console.log("addItem", id);
        const url = `http://localhost:8080/api/items/newitem`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getItems();
    }

    render() {
        return (
            <>
                <h1>Auctions</h1>
                <Router>
                    <Items path="/" data={this.state.items}
                               addItem={(id) => this.addItem(id)}
                    ></Items>
                    <Item path="/Item/:id"
                              getItem={id => this.getItem(id)}
                              postBid={(id, bid) => this.postBid(id, bid)}
                    ></Item>
                    <Login></Login>
                </Router>
            </>
        );
    }
}

export default App;
