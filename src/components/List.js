import React, { Component } from 'react';
import Item from './Item';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                items: []
            }
        };
    }

    componentDidMount = () => {
        this.fetchList(3) // ID FOR TESTING
    }

    fetchList = (id) => {
        fetch(`http://localhost:3000/lists/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    list: data
                }, () => {
                    console.log(this.state);
                });
            })
            .catch(err => console.log('View list error: ', err));
    }

    render() {
        return (
            <div>
                <div>
                    <h3>{this.state.list.name}'s Wishlist</h3>
                </div>
                <div className="itemList">
                    {this.state.list.items.map((item, index) => {
                        return (
                            <Item
                                key={index}
                                index={index}
                                item={item}
                                handlePurchaser={this.handlePurchaser}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default List;
