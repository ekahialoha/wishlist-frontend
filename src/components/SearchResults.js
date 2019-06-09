import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        };
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/lists/search/${encodeURI(this.props.match.params.query)}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchResults: data
            })
        })
        .catch(err => console.log('search results: ', err));
    }

    render() {
        let style = {maxHeight: '50px', maxWidth: '50px', borderRadius: '50%'};
        return (
            <div>
                <h2>Search Results {this.props.match.params.query}</h2>
                {this.state.searchResults.map((result, index) => {
                    const link = `/view/${result.id}`
                    return (
                        <React.Fragment key={index}>
                            <Link to={link}>
                                <div>
                                    <img src={result.image} alt={result.name} style={style}/>
                                    <h4>{result.name}</h4>
                                    <h5>{result.description}</h5>
                                </div>
                            </Link>
                        </React.Fragment>
                    );
                })}
            </div>
        );
    }
}

export default SearchResults;
