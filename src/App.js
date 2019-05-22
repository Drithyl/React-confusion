import React, { Component } from 'react';
import logo from './logo.svg';

//import the Navbar and NavbarBrand Bootstrap components from the reactstrap module
import { Navbar, NavbarBrand } from "reactstrap";

//import our own components
import Menu from "./components/MenuComponent.js";

import './App.css';

//import the information on our dishes
import { DISHES } from "./shared/dishes";

//create an App component that will then be exported to be rendered in index.js
class App extends Component {

  constructor(props) {

    super(props);

    //make the dishes part of the App's state to make it available to
    //components below as props
    this.state = {
      dishes: DISHES
    }
  }

  render ()
  {
    return (
      <div>
        { /* Reactstrap's Navbar component with the dark theme */ }
        <Navbar dark color="primary">
        { /* Bootstrap's container for rows */ }
        <div className="container">
          { /* NavbarBrand is the component in which we specify the branding (name, logo) */}
          <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
        </div>
        </Navbar>

        {/* To render our component we simply need to include it as a self closing tag.
            This one then gets rendered in index.js as part of the App component,
            building a single complex component out of many different ones */}
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;
