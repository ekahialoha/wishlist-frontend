import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

class Nav extends Component {
    render() {
        return (
            <div>
            <Link to="/new">New Wish List</Link>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nisl non tellus elementum consequat. Nunc est libero, semper sit amet ante sit amet, dapibus pellentesque nibh. Aliquam vehicula sollicitudin felis, eu convallis magna pellentesque non. Integer consequat facilisis mauris et venenatis. Vestibulum nisl ex, vulputate id mi aliquet, fringilla tristique purus. Praesent quis magna mollis, hendrerit neque lacinia, cursus justo. Morbi non diam risus. Nullam odio orci, finibus a vulputate nec, blandit nec lectus.</p>
            <Search />
            </div>
        );
    }
}

export default Nav;
