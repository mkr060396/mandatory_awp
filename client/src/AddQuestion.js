import React,{Component} from 'react';

class AddQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: ""
        };


    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit() {
        this.props.addQuestion(this.state.questions);
    }
    render() {
        return (
            <>
                <input name="questions" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Add question</button>
            </>
        );
    }
}

export default AddQuestion;