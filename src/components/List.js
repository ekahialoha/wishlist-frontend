import React, { Component } from 'react';
import Item from './Item';
import { Redirect } from 'react-router-dom';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                items: []
            },
            random: false,
            redirect: false
        };
    }

    componentDidMount = () => {
        this.fetchList();
    }

    fetchList = () => {
        let url = 'http://localhost:3000/lists/';
        let path = this.props.location.pathname;
        if (path === '/') {
            url += 'random';
            this.setState({
                random: true
            })
        } else {
            const id = path.split('/')[2];
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

    handleDelete = () => {
        fetch(`http://localhost:3000/lists/${this.state.list.id}`, {
            method: 'DELETE'
        }).then(data => {
            console.log('deleted');
        }).catch(err => console.log('delete item error: ', err));
        this.setState({
            redirect: true
        })
    }

    render() {
        let style = {maxHeight: '50px', maxWidth: '50px', borderRadius: '50%'};

        if (this.state.redirect === true) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <div>
                    {this.state.random ? <h2>Featured Wishlist</h2> : '' }
                    <img src={this.state.list.image} style={style}/>
                    <h3>{this.state.list.name}</h3>
                    <i className="fas fa-edit"></i>
                    <i className="far fa-trash-alt" onClick={this.handleDelete}></i>
                </div>
                {this.state.list.items ?
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
                    </div> : ''
                }

            </div>
        );
    }
}

export default List;
