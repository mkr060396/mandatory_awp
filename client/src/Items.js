import React, {Component} from 'react';
import {Link} from "@reach/router";
import AddItem from "./AddItem";

class Items extends Component {
    render() {
        const list = this.props.data.map(q =>
            <li><Link to ={"/Item/"+q.id}>{q.item}</Link></li>);

        return (
            <>
            <ul>
                {list}
            </ul>

            <AddItem addItem={id => this.props.addItem(id)}/>
            </>
        );
    }
}

export default Items;