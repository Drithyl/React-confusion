import React, { Component } from 'react';

//import the Navbar and NavbarBrand Bootstrap components from the reactstrap module
import { Navbar, NavbarBrand } from "reactstrap";

//import our own components
import Menu from "./MenuComponent.js";
import DishDetail from "./DishdetailComponent.js";

//import the information on our dishes
import { DISHES } from "../shared/dishes";

//create an App component that will then be exported to be rendered in index.js
class Main extends Component {

  constructor(props) {

    super(props);

    //make the dishes part of the state to make it available to components below as props
    //single source of truth for the state of this component. When you need to
    //alter the state, use the setState({}, cb) function
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    //always use setState to change the state of a Component
    console.log("Selected " +dishId);
    this.setState({ selectedDish: dishId });
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
        <Menu dishes={this.state.dishes} onClick={ (dishId) => this.onDishSelect(dishId) } />
        <DishDetail selectedDish={ this.state.dishes.find((dish) => dish.id === this.state.selectedDish) } />
      </div>
    );
  }
}

export default Main;
