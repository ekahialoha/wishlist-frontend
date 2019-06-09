import React, { Component } from 'react';

class SearchResults extends Component {
    componentDidMount = () => {
        fetch(`http://localhost:3000/lists/search/${encodeURI(this.props.match.params.query)}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log('search results: ', err));
    }

    render() {
        return (
            <h2>Search Results {this.props.match.params.query}</h2>
        );
    }
}

export default SearchResults;
