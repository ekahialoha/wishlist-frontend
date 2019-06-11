import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Media, Form, InputGroup } from 'react-bootstrap';
import ModalConfirm from './ModalConfirm';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            purchased: false,
            showForm: false,
            displayModal: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.name) {
            let item = Object.assign(this.props.item);
            item.purchased = true;
            item.purchased_by = this.state.name;
            this.props.handlePurchaser(item, this.props.index);
            this.setState({
                showForm: false,
                name: ''
            });
        }
    }

    handleChanges = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleClick = (e) => {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    handleDelete = () => {
        this.props.handleDeleteItem(this.props.item.id, this.props.index);
    };

    handleModalToggle = () => {
        this.setState({
            displayModal: !this.state.displayModal
        });
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.rand !== this.props.rand) {
            this.setState({
                name: '',
                purchased: false,
                showForm: false
            });
        }
    }

    render() {
        return (
            <Media className="item-container">
                {
                    this.props.item.purchased ?
                        <React.Fragment>
                            <img className="grayscale" src={this.props.item.image} alt={this.props.item.name} />
                            <Media.Body>
                                <del>{this.props.item.name}</del>
                                <p className="gifted-by">Gifted by: {this.props.item.purchased_by}</p>
                            </Media.Body>
                        </React.Fragment>
                         :
                        <React.Fragment>
                            <img src={this.props.item.image} alt={this.props.item.name} />
                            <Media.Body>
                                {this.state.showForm ? '' : <p>{this.props.item.name}</p>}
                            </Media.Body>
                        </React.Fragment>
                    }
                {this.state.showForm ?
                    <React.Fragment>
                        <Form onSubmit={this.handleSubmit}>
                            <InputGroup>
                                <Form.Control
                                    required
                                    type="text"
                                    onChange={this.handleChanges}
                                    value={this.state.name}
                                    placeholder="Enter your Name"
                                />
                                <InputGroup.Append>
                                    <Button type="submit" className="btn create-btn">Gift</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                        <i className="far fa-window-close" onClick={this.handleClick}></i>
                    </React.Fragment> :
                    <div>
                        {!this.props.item.purchased ?
                            <i className="fas fa-gift" onClick={this.handleClick}></i> :
                            null
                        }
                        <ModalConfirm
                            heading="Delete Item"
                            body="Are you sure you want to delete this Item?"
                            displayModal={this.state.displayModal}
                            handleModalToggle={this.handleModalToggle}
                            handleConfirmed={this.handleDelete}
                        />
                        <i className="far fa-trash-alt" onClick={this.handleModalToggle}></i>
                    </div>
                }
            </Media>
        );
    }
}

export default Item;
