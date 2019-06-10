import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Form, FormControl, Button } from 'react-bootstrap';

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
        this.props.handleNavToggle(false);
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
            <Form onSubmit={this.handleSubmit} inline>
                <FormControl
                    type="text"
                    name="q"
                    value={this.state.searchInput}
                    onChange={this.handleChanges}
                    required="required"
                />
                <Button type="submit" className="ml-sm-2">Search</Button>
            </Form>
        );
    }
}

export default Search;
