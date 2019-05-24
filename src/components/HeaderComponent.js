
import React, { Component } from "react";

//import the Navbar and NavbarBrand Bootstrap components from the reactstrap module
import { Navbar, NavbarBrand, Jumbotron } from "reactstrap";

class Header extends Component
{
  render()
  {
    return (
      //Allows us to group together a bunch of elements and then return them.
      //This is an alternative to using <div> to return the rendering. However,
      //A div adds an additional node into the DOM, whereas React.Fragment adds
      //the components directly into it, hence its usage. The shorthand notation
      //is <> </> but may not be interpreted correctly by all browsers
      <React.Fragment>
      { /* Reactstrap's Navbar component with the dark theme */ }
        <Navbar dark>
          { /* Bootstrap's container for rows */ }
          <div className="container">
            { /* NavbarBrand is the component in which we specify the branding (name, logo) */}
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
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
