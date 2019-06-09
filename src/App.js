import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";
import Media from 'react-media';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Index from './components/Index';
import CreateList from './components/CreateList';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <h1><Link to="/">WishList</Link></h1>
                    <Navigation />
                    <Switch>
                        <Route exact path='/' component={Index} /> // Random Index
                        <Route path='/new' component={CreateList} /> // Create List
                        <Redirect from='/test' to='/about' />
                        <Route path='/view/:id' component={() => <h2>View List</h2>} /> // View List
                        <Route path='/search' component={SearchResults}/> // Search Results
                    </Switch>
                </Router>
            </div>
        );
    }
}

function SearchResults({ location }) {
    console.log(location.search);
    let params = new URLSearchParams(location.search);
    console.log(params.get('q'));
    return <h2>Search Results {params.get('q')}</h2>;
}

export default App;
