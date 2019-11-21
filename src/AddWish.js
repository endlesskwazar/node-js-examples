import React, { Component } from 'react';


class AddWish extends Component {

    constructor(props) {
        super(props);
        this.state = { title: '' }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
        const title = event.target.value;
        this.setState({
            title
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addWish(this.state.title);
    }

    render() {
        return (
            <div>
                <h2>Add wish</h2>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
                    </label>
                    <input type="submit" value="Add" />
                </form>
            </div>
        );
    }

}

export default AddWish;