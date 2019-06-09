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
        this.fetchList();
    }

    fetchList = () => {
        console.log('fetch');
        let url = 'http://localhost:3000/lists/';
        let path = this.props.location.pathname;
        if (path === '/') {
            url += 'random';
        } else {
            const id = path[path.length - 1];
            url += `${id}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (path === '/') {
                    data.items = data.items.slice(0, 6);
                }
                this.setState({
                    list: data
                }, () => {
                    console.log(this.state);
                });
            })
            .catch(err => console.log('View list error: ', err));
    }

    handlePurchaser = (item, index) => {
        console.log(JSON.stringify(item));
        fetch(`http://localhost:3000/items/${item.id}`, {
            body: JSON.stringify(item),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
        })
        .then(updatedItem => updatedItem.json())
        .catch(err => console.log('update item error: ', err));
        this.updateItem(item, index);
    }

    updateItem(item, index) {
        this.setState(prevState => {
            prevState['list'].items[index] = item;
            return {
                list: prevState['list']
            }
        });
    }

    render() {
        // console.log(this.state.list);
        return (
            <div>
                <div>
                    <h2>Featured Wishlist</h2>
                    <h3>{this.state.list.name}</h3>
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
