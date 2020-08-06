import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostBid from "./PostBid";

class Item extends Component {
    render() {
        const id = this.props.id;
        const itemMap = this.props.getItem(id);
        let content = <p>Loading</p>;
        if (itemMap) {
            content =
                <>
                    <h1>{itemMap.Item}</h1>

                    <h3>Auctions</h3>
                    <ul>
                        {itemMap.Item.map(h => <li key={h}>{h}</li>)}
                    </ul>

                    <Link to="/">Back</Link>
                </>
        }
        return (
            <>
                <h2>Auctions</h2>
                <p>{content}</p>
                <h3>Bids</h3>


                <PostBid id={id} postBid={(id, bid) => this.props.postBid(id, bid)}/>
            </>
        );

    }
}

export default Item;
