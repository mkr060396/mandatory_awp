import React,{Component} from 'react';

class AddItem extends Component {

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
        this.props.AddItem(this.state.questions);
    }
    render() {
        return (
            <>
                <input name="items" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Post an Auction</button>
            </>
        );
    }
}

export default AddItem;