import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";
import Media from 'react-media';

// Components
import Navigation from './components/Navigation';
import SearchResults from './components/SearchResults';
import List from './components/List';
import CreateList from './components/CreateList';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <h1><Link onClick={() => this.forceUpdate()} to="/">WishList</Link></h1>
                    <Navigation />
                    <Switch>
                        <Route exact path='/' component={(props) => <List rand={Math.random()} {...props} />}/>}/> // Random Index
                        <Route path='/new' component={CreateList} /> // Create List
                        <Redirect from='/test' to='/about' />
                        <Route path='/view/:id' component={(props) => <List rand={Math.random()} {...props} />}/>} /> // View List
                        <Route path='/search/:query' component={SearchResults} /> // Search Results
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
