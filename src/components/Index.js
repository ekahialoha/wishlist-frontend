import React, { Component } from 'react';
import Item from './Item';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomList: {
                items: []
            }
        };
    }

    componentDidMount = () => {
        this.fetchRandomList();
    }

    fetchRandomList = () => {
        fetch('http://localhost:3000/lists/random')
        .then(res => res.json())
        .then(data => {
            this.setState({
                randomList: data
            }, () => {
                console.log(this.state);
            })
        })
        .catch(err => console.log('Random fetch error: ', err));
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
            prevState['randomList'].items[index] = item;
            return {
                randomList: prevState['randomList']
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Featured Wishlist</h2>
                    <h3>{this.state.randomList.name}</h3>
                </div>
                <div className="itemList">
                    {this.state.randomList.items.slice(0, 6).map((item, index) => {
                        return (<Item
                                    key={index}
                                    index={index}
                                    item={item}
                                    handlePurchaser={this.handlePurchaser}
                                />);
                    })}
                </div>
            </div>
        );
    }
}

export default Index;
