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

    renderCreateWishlistBtn = (classname) => {
        return (
            <Navbar.Text>
                <Link to="/new">
                    <Button
                        block
                        size="lg"
                        className={classname}
                        onClick={() => this.handleNavToggle(false)}
                    >
                        Create WishList
                    </Button>
                </Link>
            </Navbar.Text>
        )
    }

    renderGetStarted = () => {
        return (
            <Navbar.Brand>Get Started</Navbar.Brand>
        )
    }

    renderAboutText = () => {
        return (
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nisl non tellus elementum consequat. Nunc est libero, semper sit amet ante sit amet, dapibus pellentesque nibh. Aliquam vehicula sollicitudin felis, eu convallis magna pellentesque non. Integer consequat facilisis mauris et venenatis.</p>
        )
    }

    renderSearchbar = (classname) => {
        return (
            <Navbar.Text className={classname}><Search handleNavToggle={this.handleNavToggle} /></Navbar.Text>
        )
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
                        {this.renderGetStarted()}
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                {this.renderSearchbar()}
                                {this.renderCreateWishlistBtn("new-list-btn")}
                                <Navbar.Text>
                                    <Button block onClick={this.toggleAbout}>About</Button>
                                </Navbar.Text>
                                <Collapse in={this.state.aboutOpen}>
                                    <Navbar.Text className="about">
                                        {this.renderAboutText()}
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
                        variant="dark"
                    >
                        {this.renderGetStarted()}
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                {this.renderCreateWishlistBtn("desktop-new-list-btn")}
                                <NavDropdown
                                    className="desktop-about"
                                    title="About"
                                >
                                    {this.renderAboutText()}
                                </NavDropdown>
                                {this.renderSearchbar("desktop-searchbar")}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Media>
            </div>
        );
    }
}

export default Navigation;
