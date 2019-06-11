import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { Navbar, Nav, Button, Collapse, NavDropdown } from 'react-bootstrap';
import Media from 'react-media';

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
            <div>
                <Media query="(max-width: 996px)">
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
                </Media>
                <Media query="(min-width: 997px)">
                    <Navbar
                        expand="lg"
                        expanded={this.state.expanded}
                        onToggle={this.handleNavToggle}
                    >
                        <Navbar.Brand>Get Started</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Navbar.Text>
                                    <Link to="/new">
                                        <Button
                                            size="lg"
                                            className="desktop-new-list-btn"
                                            onClick={() => this.handleNavToggle(false)}
                                        >
                                            Create WishList
                                        </Button>
                                    </Link>
                                </Navbar.Text>
                                <NavDropdown className="desktop-about" title="About">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nisl non tellus elementum consequat. Nunc est libero, semper sit amet ante sit amet, dapibus pellentesque nibh. Aliquam vehicula sollicitudin felis, eu convallis magna pellentesque non. Integer consequat facilisis mauris et <a target="_blank" href="https://www.linkedin.com/in/molly-stone-profile/">venenatis</a>.
                                </NavDropdown>
                                <Navbar.Text className="desktop-searchbar"><Search handleNavToggle={this.handleNavToggle} /></Navbar.Text>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Media>
            </div>
        );
    }
}

export default Navigation;
