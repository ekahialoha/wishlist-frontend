import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: '',
            redirect: false
        };
    }

    handleChanges = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            redirect: true
        });
    }

    componentDidUpdate = () => {
        if (this.state.redirect)
        {
            this.setState({
                redirect: false,
                searchInput: ''
            });
        }
    }

    render() {
        if (this.state.redirect) {
            const url = `/search/${encodeURI(this.state.searchInput)}`;
            return <Redirect to={url} />;
        }
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
