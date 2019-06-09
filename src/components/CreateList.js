import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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
    }

    render() {
        return (
            <div>
                <h2>Create New List</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="enter name" onChange={this.handleChanges} value={this.state.name} id="name"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="2" placeholder="description" onChange={this.handleChanges} value={this.state.description} id="description"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="image" onChange={this.handleChanges} value={this.state.image} id="image"/>
                    </Form.Group>
                    <Button type="submit" size="lg" block>Create WishList</Button>
                </Form>
            </div>
        );
    }
}

export default CreateList;
