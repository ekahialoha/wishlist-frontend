import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

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
        let style = {maxHeight: '100px', maxWidth: '100px'};
        return (
            <div>
                <img src={this.props.item.image} alt={this.props.item.name} style={style} />
                {this.props.item.name}
                {this.state.showForm ?
                    <React.Fragment>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                onChange={this.handleChanges}
                                value={this.state.name}
                                placeholder="Enter your Name"
                            />
                            <Button type="submit">Go</Button>
                        </form>
                        <Button onClick={this.handleClick}>Cxl</Button>
                    </React.Fragment> :
                    <i className="fas fa-gift" onClick={this.handleClick}></i>
                }
            </div>
        );
    }
}

export default Item;
