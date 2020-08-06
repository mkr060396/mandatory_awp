import React, {Component} from 'react';
import {Link} from "@reach/router";

class PostBid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.PostBid(this.props.id, this.state.input);
    }

    render() {
        return (
            <>
                <input name="input" onChange={event => this.onChange(event)} type="number"/>
                <button onClick={_ => this.onSubmit()}>Post your bid</button>
            </>
        )
    }
}

export default PostBid;

