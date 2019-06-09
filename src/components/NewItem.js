import React, { Component } from 'react';
import List from './List';
import { Redirect } from 'react-router-dom';
import { Form, Button, Accordion, Card } from 'react-bootstrap';

class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: ''
        };
    }
    
    render() {
        return (
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" block size="lg" eventKey="0">Add New Item <i className="fas fa-caret-down"></i></Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Form>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="name" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="text" placeholder="image" />
                                </Form.Group>
                                <Button type="submit" block size="lg"><i className="fas fa-plus"></i></Button>
                            </Form>
                        </Accordion.Collapse>
                    </Card.Header>
                </Card>
            </Accordion>
        );
    }
}

export default NewItem;
