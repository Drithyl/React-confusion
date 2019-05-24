import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

//import our own components
import Home from "./HomeComponent.js";
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
      dishes: DISHES
    };
  }

  render ()
  {
    //We will specify further props into the Home component here. This could also
    //be used for the Menu Route component declared within the Switch below.
    const HomePage = function()
    {
      return (
        <Home />
      );
    }

    return (
      <div>
        <Header />

        {/* Switch component from React Router groups together several routes */}
        <Switch>
          {/* Route component from React Router specifies the navigation path to reach that resource */}
          <Route path="/home" component={HomePage} />

          {/* exact attribute means path should match exactly this to route to that component.
            We can pass the name of the component directly into the component attribute but this
            will not allow us to pass props into it like we would with the JSX <Component />
            notation. This is why we create it using the following syntax; declaring a function
            that returns the component's name along with the props we pass in a JSX format */}
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />

          {/* Redirect React Router component allows us to specify a default route that will be
              used whenever the URL provided does not match any of the Routes specified above.
              The to attribute will specify which Route the user is redirected to */}
          <Redirect to="/home" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default Main;
