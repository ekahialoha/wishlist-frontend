import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";

import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ forceRefresh: true });

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            'searchInput': ''
        };
    }

    handleChanges = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state.searchInput);
        // return (<Redirect to={{
        //     path: '/search',
        //     search: `?q={this.state.searchInput}`
        // }} /> );
        history.push(`/search?q=${this.state.searchInput}`);
        // return( <Redirect to="/about" />)
        // GRAB value of q
        // CHANGE route to /search/<value of q>
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <input
                type="text"
                name="q"
                value={this.state.searchInput}
                onChange={this.handleChanges}
            />
            <input type="submit" value="search" />
            </form>
        );
    }
}

export default Search;
