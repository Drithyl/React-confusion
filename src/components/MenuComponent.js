
import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from "reactstrap";
import DishDetail from "./DishdetailComponent.js";

class Menu extends Component {

  constructor(props) {
    super(props);

    //single source of truth for the state of this component. When you need to
    //alter the state, use the setState({}, cb) function
    this.state =
    {
      selectedDish: null
    };

    console.log("Menu Component constructor() is invoked.");
  }

  componentDidMount() {
    console.log("Menu Component componentDidMount() is invoked.");
  }

  onDishSelect(dish) {
    //always use setState to change the state of a Component
    this.setState({ selectedDish: dish });
  }

  //every component must have a render() function that returns a set of HTML
  //elements inside parenthesis that will be the view of the component. This
  //render function gets called directly by React once the component is attached
  //to ReactDOM.render() like in index.js
  render() {

    console.log("Menu Component render() is invoked.");

    //dishes are passed as props by the App component
    const menu = this.props.dishes.map((dish) =>
    {
      //the return will return this HTML code for every index of the this.state.dishes
      //array, and store the final HTML array into menu.
      return (
        //Use curly braces {} to embed JavaScript code or references into the HTML
        //The key attribute helps react identify which items change, are added or removed,
        //and should always be added to lists of elements. React only re-renders the parts
        //of the virtual DOM that have changed, so if the array of items changes, it will
        //use the keys to know which ones to re-render and which ones to leave as is
        <div key={dish.id} className="col-12 col-md-5 m-1">
          {/* events are named with camelToe case with the same HTML names.
              Declare a function to be called embedded inside the attribute */}
          <Card onClick={ () => { this.onDishSelect(dish) } }>
              <CardImg width="100%" src={dish.image} alt={dish.name} />

              <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      //HTML attributes use camelCase in JSX to not conflict with JS syntax and keywords
      <div className="container">
        <div className="row">
          {/* Display whatever HTML is contained inside the menu constant */}
          {menu}
        </div>

        <DishDetail selectedDish={this.state.selectedDish} />
      </div>
    );
  }
}

export default Menu;
