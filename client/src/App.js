import React, {Component} from 'react';
import {Router} from "@reach/router";
import Questions from "./Questions";
import Question from "./Question";

class App extends Component {
    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        // Get everything from the API
        this.getQuestions().then(() => console.log("Question received!"));
    }

    async getQuestions() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    getQuestion(id) {
        const question = this.state.questions.find(q => q.id === parseInt(id));
        return question;
    }

    async postAnswer(id, text) {
        console.log("postAnswer", id, text);
        const url = `http://localhost:8080/api/questions/${id}/answers`;

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

        this.getQuestions();
    }

    async addQuestion(text) {
        console.log("addQuestion", text);
        const url = `http://localhost:8080/api/questions/newquestion`;
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
        this.getQuestions();
    }

   /* async upvote(id, aid) {
        console.log("addQuestion", text);
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                text: text
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        this.getQuestions();
    }*/

    render(){
        return (
            <>
                <h1>QA</h1>
                <Router>
                    <Questions path="/" data={this.state.questions}
                               addQuestion={(text) => this.addQuestion(text)}
                    ></Questions>
                    <Question path="/Question/:id"
                              getQuestion={id => this.getQuestion(id)}
                              postAnswer={(id, text) => this.postAnswer(id, text)}
                    ></Question>
                </Router>
            </>
        );
    }
}

export default App;
