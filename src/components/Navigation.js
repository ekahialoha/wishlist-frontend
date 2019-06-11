import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { Navbar, Nav, Button, Collapse } from 'react-bootstrap';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            aboutOpen: false
        };
    }

    handleNavToggle = (expand) => {
        this.setState({
            expanded: expand,
            aboutOpen: expand === false ? false : this.state.aboutOpen
        });
    }

    toggleAbout = () => {
        this.setState({
            aboutOpen: !this.state.aboutOpen
        });
    }

    render() {
        return (
            <Navbar
                expand="false"
                expanded={this.state.expanded}
                onToggle={this.handleNavToggle}
            >
                <Navbar.Brand>Get Started</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Navbar.Text><Search handleNavToggle={this.handleNavToggle} /></Navbar.Text>
                        <Navbar.Text>
                            <Link to="/new">
                                <Button
                                    block
                                    size="lg"
                                    className="new-list-btn"
                                    onClick={() => this.handleNavToggle(false)}
                                >
                                    Create WishList
                                </Button>
                            </Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <Button block onClick={this.toggleAbout}>About</Button>
                        </Navbar.Text>
                            <Collapse in={this.state.aboutOpen}>
                                <Navbar.Text className="about">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nisl non tellus elementum consequat. Nunc est libero, semper sit amet ante sit amet, dapibus pellentesque nibh. Aliquam vehicula sollicitudin felis, eu convallis magna pellentesque non. Integer consequat facilisis mauris et venenatis.
                                </Navbar.Text>
                            </Collapse>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Navigation;
