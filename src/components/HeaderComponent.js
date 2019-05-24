
import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      isNavOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav()
  {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  render()
  {
    return (
      //Allows us to group together a bunch of elements and then return them.
      //This is an alternative to using <div> to return the rendering. However,
      //A div adds an additional node into the DOM, whereas React.Fragment adds
      //the components directly into it, hence its usage. The shorthand notation
      //is <> </> but may not be interpreted correctly by all browsers
      <React.Fragment>
        {/* Reactstrap's Navbar component with the dark theme. expand will make it
            show in its full form only for md screen sizes and above, thanks to the
            Collapse reactstrap component */}
        <Navbar dark expand="md">
          { /* Bootstrap's container for rows */ }
          <div className="container">
            {/* Reactstrap component that creates a button to toggle the navbar
                thanks to the Collapse component enclosing it below. Will only
                show in xs and s screen sizes */}
            <NavbarToggler onClick={this.toggleNav} />

            { /* NavbarBrand is the component in which we specify the branding (name, logo) */}
            <NavbarBrand className="mr-auto" href="/">
              <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
            </NavbarBrand>

            {/* The Collapse component allows us to collapse content. The isNavOpen
                state will be kept track of inside the state of this component and
                lets React know whether to collapse or expand with each click. It
                is a required prop for Collapse. */}
            <Collapse isOpen={this.state.isNavOpen} navbar>
              {/* Create a navbar. The navbar attribute is Bootstrap styling */}
              <Nav navbar>
                {/* Specify an item within the navbar */}
                <NavItem>
                  {/* NavLink is a React Router component. It allows us to specify
                      the route to which the link takes a user (similar to the href)
                      in the <a> elements, except here the different routes are
                      defined by the Route React Router components used in the
                      MainComponent file */}
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante Con Fusion</h1>
                <p>We take inspiration from from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </React.Fragment>
    );
  }
}

export default Header;
