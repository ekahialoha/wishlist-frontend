import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Badge, Media } from 'react-bootstrap';

const API_URI = process.env.REACT_APP_BACKEND_URI;

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: []
        };
    }

    fetchSearchResults = () => {
        fetch(`${API_URI}/lists/search/${encodeURI(this.props.match.params.query)}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                searchResults: data
            })
        })
        .catch(err => console.log('search results: ', err));
    }

    componentDidMount = () => {
        this.fetchSearchResults();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.rand !== this.props.rand) {
            this.fetchSearchResults();
        }
    }

    render() {
        return (
            <Container className="searchResults">
                <div>
                    Showing {this.state.searchResults.length} results for:
                    <Badge variant="secondary">{this.props.match.params.query}</Badge>
                </div>
                {this.state.searchResults.map((result, index) => {
                    const link = `/view/${result.id}`
                    return (
                        <Media key={index}>
                            {index + 1}.<img src={result.image} alt={result.name} />
                            <Link to={link}>
                                <Media.Body>
                                    <h4>{result.name}</h4>
                                    <p>{result.description}</p>
                                </Media.Body>
                            </Link>
                        </Media>
                    );
                })}
            </Container>
        );
    }
}

export default SearchResults;
