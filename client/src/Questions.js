import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";
import AddQuestion from "./AddQuestion";

class Questions extends Component {
    render() {
        const list = this.props.data.map(q =>
            <li><Link to ={"/Question/"+q.id}>{q.question}</Link></li>);

        return (
            <>
            <ul>
                {list}
            </ul>

            <AddQuestion addQuestion={text => this.props.addQuestion(text)}/>


            </>
        );
    }
}

export default Questions;