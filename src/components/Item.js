import React, { Component } from 'react';

class Item extends Component {
    render() {
        let style = {height: '100px'};
        return (
            <div>
                <img src={this.props.item.image} alt={this.props.item.name} style={style} />
                {this.props.item.name}
            </div>
        );
    }
}

export default Item;
