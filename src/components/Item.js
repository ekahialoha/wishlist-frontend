import React, { Component } from 'react';

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
        let item = Object.assign(this.props.item);
        item.purchased = true;
        item.purchased_by = this.state.name;
        this.props.handlePurchaser(item, this.props.index);
        this.setState({
            showForm: false,
            name: ''
        });
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
        let style = {height: '100px'};
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
                            <input type="submit" value="Go" />
                        </form>
                        <button onClick={this.handleClick}>Cxl</button>
                    </React.Fragment> :
                    <button onClick={this.handleClick}>Gift?</button>
                }
            </div>
        );
    }
}

export default Item;
