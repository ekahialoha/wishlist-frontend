import React, { Component } from 'react';
import { Form, Button, Accordion, Card } from 'react-bootstrap';

class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            list_id: null,
            showForm: false
        };
        this.addItemRef = React.createRef();
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            list_id: this.props.listID,
            purchased: false
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleCreateItem(this.state);
        this.setState({
            name: '',
            image: '',
            list_id: null
        });
    }

    handleScroll = () => {
        // setTimeout required because this.addItemRef is hidden, need to at 305 milliseconds before we scroll
        setTimeout(() => {
            this.addItemRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 305);
    }

    handleShowForm = () => {
        this.setState({
            showForm: !this.state.showForm
        }, () => {
            if (this.state.showForm) {
                this.handleScroll();
            }
        });
    };

    render() {
        return (
                <Card>
                    <Card.Header onClick={this.handleShowForm}>
                        <span>Add New Item <i className="fas fa-caret-down"></i></span>
                    </Card.Header>
                    {this.state.showForm ?
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="name"
                                        id="name"
                                        onChange={this.handleChanges}
                                        value={this.state.name}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="image"
                                        id="image"
                                        onChange={this.handleChanges}
                                        value={this.state.image}
                                    />
                                </Form.Group>
                                <Button
                                    ref={this.addItemRef}
                                    type="submit"
                                    block
                                    size="lg"
                                    className="btn create-btn"
                                >
                                    <i className="fas fa-plus"></i>
                                </Button>
                            </Form>
                        </Card.Body> :
                        null }
                </Card>
        );
    }
}

export default NewItem;
