import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {},
            items: []
        };
    }

    componentDidMount = () => {
        this.fetchList(3) // ID FOR TESTING
    }

    fetchList = (id) => {
        fetch(`http://localhost:3000/lists/${id}`)
            .then(foundList => foundList.json())
            .then(jsonData => this.setList(jsonData))
    }

    setList = (list) => {
        const items = list.items.slice();
        this.setState({
            list: list,
            items: items
        });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <div>
                    <h2>{this.state.list.name}'s Wishlist</h2>
                </div>
                <div className="itemList">
                    {this.state.items.map((item, index) => {
                        return (
                            <Item
                                key={index}
                                index={index}
                                item={item}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default List;

// {this.state.list.items.map((item, index) => {
//     return (
//         <Item
//             key={index}
//             index={index}
//             item={item}
//             handlePurchaser={this.handlePurchaser}
//         />
//     );
// })}
