import React, { Component } from 'react';

class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: ''
        };
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        this.handleCreateList(this.state);
        this.clearForm();
    }

    clearForm = () => {
        this.setState({
            name: '',
            description: '',
            image: ''
        });
    }

    handleCreateList = (list) => {
        fetch('http://localhost:3000/lists', {
            body: JSON.stringify(list),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(createdTask => createdTask.json())
        .catch(err => console.log('create list error: ', err));
        // REDIRECT TO VIEW THE WISHLIST
    }

    render() {
        return (
            <div>
                <h2>Create New List</h2>
                <form onSubmit={this.handleSubmit}>
                    Name: <input type="text" placeholder="enter name" onChange={this.handleChanges} value={this.state.name} id="name"/><br/>
                    Description: <textarea placeholder="description" onChange={this.handleChanges} value={this.state.description} id="description"></textarea><br/>
                    Image: <input type="text" placeholder="image" onChange={this.handleChanges} value={this.state.image} id="image"/><br/>
                    <input type="submit" value="Create New List"/>
                </form>
            </div>
        );
    }
}

export default CreateList;
