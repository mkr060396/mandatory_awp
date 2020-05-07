import React, {Component} from 'react';
import {Link} from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
    render() {
        const id = this.props.id;
        const test = this.props.getQuestion(id);
        let content = <p>Loading</p>;
        if (test) {
            content =
                <>
                    <h1>{test.question}</h1>

                    <h3>Text</h3>
                    <ul>
                        {test.answers.map(h =>
                            <li key={h}>
                                {h}
                                <button>Vote</button>
                        </li>)}
                    </ul>

                    <Link to="/">Back</Link>
                </>
        }
        return (
            <>
                <h2>Question</h2>
                <p>{content}</p>
                <h3>Answers</h3>



                {/* PostAnswer */}
                <PostAnswer id={id} postAnswer={(id, text) => this.props.postAnswer(id, text)}/>
            </>
        );

    }
}

export default Question;
