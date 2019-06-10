import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const API_URI = process.env.REACT_APP_BACKEND_URI;

class CreateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            image: '',
            redirect: false,
            createdListID: null
        };
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleCreateList(this.state);
    }

    handleCreateList = (list) => {
        fetch(`${API_URI}/lists`, {
            body: JSON.stringify(list),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(createdTask => createdTask.json())
        .then(data => {
            this.setState({
                redirect: true,
                createdListID: data.id
            }, console.log(data))
        })
        .catch(err => console.log('create list error: ', err));
    }

    render() {
        if (this.state.redirect === true) {
            let redirectTo = `/view/${this.state.createdListID}`;
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <h2>Create New List</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="enter name"
                            onChange={this.handleChanges}
                            value={this.state.name}
                            id="name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows="2"
                            placeholder="description"
                            onChange={this.handleChanges}
                            value={this.state.description}
                            id="description"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="image"
                            onChange={this.handleChanges}
                            value={this.state.image}
                            id="image"
                        />
                    </Form.Group>
                    <Button type="submit" size="lg" block>Create WishList</Button>
                </Form>
            </div>
        );
    }
}

export default CreateList;
