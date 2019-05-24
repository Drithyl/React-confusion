import React, { Component } from 'react';

//import our own components
import Menu from "./MenuComponent.js";
import DishDetail from "./DishdetailComponent.js";
import Header from "./HeaderComponent.js";
import Footer from "./FooterComponent.js";

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
    this.setState({ selectedDish: dishId });
  }

  render ()
  {
    return (
      <div>
        <Header />

        {/* To render our component we simply need to include it as a self closing tag.
            This one then gets rendered in index.js as part of the App component,
            building a single complex component out of many different ones */}
        <Menu dishes={this.state.dishes} onClick={ (dishId) => this.onDishSelect(dishId) } />
        <DishDetail selectedDish={ this.state.dishes.find((dish) => dish.id === this.state.selectedDish) } />
        <Footer />
      </div>
    );
  }
}

export default Main;
