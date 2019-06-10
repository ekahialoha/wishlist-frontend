import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
                    <h1 className="logo"><Link to="/">WishList</Link></h1>
                    <Navigation />
                    <Switch>
                        <Route exact path='/' component={(props) => <List rand={Math.random()} {...props} />}/>}/>
                        <Route path='/new' component={CreateList} />
                        <Route path='/view/:id' component={(props) => <List rand={Math.random()} {...props} />}/>} />
                        <Route path='/search/:query' component={(props) => <SearchResults rand={Math.random()} {...props} />}/>} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
