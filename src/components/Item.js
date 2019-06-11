import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Media } from 'react-bootstrap';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            purchased: false,
            showForm: false
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
                        <form onSubmit={this.handleSubmit}>
                            <input
                                required
                                type="text"
                                onChange={this.handleChanges}
                                value={this.state.name}
                                placeholder="Enter your Name"
                            />
                            <Button type="submit">Go</Button>
                        </form>
                        <Button onClick={this.handleClick}>Cxl</Button>
                    </React.Fragment> :
                    <div>
                        {!this.props.item.purchased ?
                            <i className="fas fa-gift" onClick={this.handleClick}></i> :
                            null
                        }
                        <i className="far fa-trash-alt" onClick={() => {
                            this.props.handleDeleteItem(this.props.item.id, this.props.index)
                        }}></i>
                    </div>
                }
            </Media>
        );
    }
}

export default Item;
