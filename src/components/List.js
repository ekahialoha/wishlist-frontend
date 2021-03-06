import React, { Component } from 'react';
import Item from './Item';
import NewItem from './NewItem';
import ModalConfirm from './ModalConfirm';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button, Container, InputGroup } from 'react-bootstrap';

const API_URI = process.env.REACT_APP_BACKEND_URI;

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                items: []
            },
            random: false,
            redirect: false,
            editing: false,
            newName: '',
            displayModal: false
        };
    }

    componentDidMount = () => {
        this.fetchList();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.rand !== this.props.rand) {
            this.fetchList();
        }
    }

    fetchList = () => {
        let url = `${API_URI}/lists/`;
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
                // console.log(data);
                if (path === '/') {
                    data.items = data.items.slice(0, 6);
                }
                this.setState({
                    list: data
                }/*, () => {
                    console.log(this.state);
                }*/);
            })
            .catch(err => console.log('View list error: ', err));
    }

    handlePurchaser = (item, index) => {
        fetch(`${API_URI}/items/${item.id}`, {
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

    updateItem = (item, index) => {
        this.setState(prevState => {
            prevState['list'].items[index] = item;
            return {
                list: prevState['list']
            }
        });
    }

    handleDelete = () => {
        fetch(`${API_URI}/lists/${this.state.list.id}`, {
            method: 'DELETE'
        }).then(data => {
            // console.log('deleted');
        }).catch(err => console.log('delete item error: ', err));
        this.setState({
            redirect: true
        })
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    renderEditForm = () => {
        return (
            <div>
                <i className="far fa-window-close" onClick={this.toggleEditing}></i>
                <Form onSubmit={this.handleEditListName}>
                    <Form.Group className="mx-4">
                        <InputGroup>
                            <Form.Control
                                required
                                type="text"
                                placeholder={this.state.list.name}
                                value={this.state.name}
                                onChange={this.handleChanges}
                            />
                            <InputGroup.Append>
                                <Button type="submit" className="btn create-btn"><i className="far fa-check-square"></i></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    handleEditListName = (e) => {
        e.preventDefault();
        let list = Object.assign(this.state.list);
        list.name = this.state.newName;
        fetch(`${API_URI}/lists/${this.state.list.id}`, {
            body: JSON.stringify(list),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(updatedList => updatedList.json())
        .then(jsonData => {
            this.setState(prevState => {
                prevState.list.name = jsonData.name
                return {
                    list: prevState.list,
                    newName: '',
                    editing: false
                };
            });
        });
    }

    handleChanges = (e) => {
        this.setState({
            newName: e.target.value
        });
    }

    updateListItems = (item) => {
        this.setState(prevState => {
            prevState['list'].items.push(item);
            return {
                list: prevState['list']
            };
        });
    }

    handleCreateItem = (item) => {
        fetch(`${API_URI}/items/`, {
            body: JSON.stringify(item),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(createdItem => createdItem.json())
        .then(jsonData => {
            this.updateListItems(jsonData);
            // console.log(jsonData);
        })
        .catch(err => console.log('create item error: ', err));
    }

    removeItemFromArray = (index) => {
        this.setState(prevState => {
            prevState['list'].items.splice(index, 1);
            return {
                list: prevState['list']
            };
        });
    }

    handleDeleteItem = (itemID, index) => {
        fetch(`${API_URI}/items/${itemID}`, {
            method: 'DELETE'
        })
        .then(data => this.removeItemFromArray(index))
        .catch(err => console.log('delete item err: ', err));
    }

    handleModalToggle = () => {
        this.setState({
            displayModal: !this.state.displayModal
        });
    }

    render() {

        if (this.state.redirect === true) {
            return <Redirect to='/' />
        }

        const path = `/view/${this.state.list.id}`;
        return (
            <Container>
                <div className="main-header">
                    {this.state.random ? <h2>Featured Wishlist</h2> : '' }
                    <div className="list-header">
                        <img className="user-image" src={this.state.list.image} alt={this.state.list.name}/>
                        {this.state.editing ?
                            this.renderEditForm() :
                            <div>
                                <i
                                    className="far fa-trash-alt"
                                    onClick={this.handleModalToggle}
                                ></i>
                                {this.state.editing ? '' :
                                    <React.Fragment>
                                        <ModalConfirm
                                            heading="Delete Wish List"
                                            body="Are you sure you want to delete this Wish List?"
                                            displayModal={this.state.displayModal}
                                            handleModalToggle={this.handleModalToggle}
                                            handleConfirmed={this.handleDelete}
                                        />
                                        <i className="fas fa-edit" onClick={this.toggleEditing}></i>
                                    </React.Fragment>
                                }
                                {this.props.location.pathname === '/' ?
                                <Link to={path}>
                                    <h3 className="user-name">{this.state.list.name}</h3>
                                </Link> :
                                <h3 className="user-name">{this.state.list.name}</h3>}
                            </div>
                        }
                    </div>
                    <p>{this.state.list.description}</p>
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
                                    handleDeleteItem={this.handleDeleteItem}
                                    rand={this.props.rand}
                                />
                            );
                        })}
                    </div> : ''
                }
                {this.state.random ? '' :
                    <NewItem
                        listID={this.state.list.id}
                        handleCreateItem={this.handleCreateItem}
                    />
                }
            </Container>
        );
    }
}

export default List;
