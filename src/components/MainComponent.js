
import React, { Component } from 'react';

//withRouter is required to configure our React component to connect to the Redux store
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

//will be used at the bottom in the export statement to link the component to the store
import { connect } from "react-redux";

//import our own components
import Home from "./HomeComponent.js";
import About from "./AboutComponent.js";
import Menu from "./MenuComponent.js";
import Contact from "./ContactComponent.js";
import DishDetail from "./DishdetailComponent.js";
import Header from "./HeaderComponent.js";
import Footer from "./FooterComponent.js";

//will map the redux store's state (see reducer.js) into props
//that will become available to this component as props
const mapStateToProps = (state) =>
{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
}

//create an App component that will then be exported to be rendered in index.js
class Main extends Component {

  constructor(props) {
    super(props);
  }

  render ()
  {
    //We will specify further props into the Home component here. This could also
    //be used for the Menu Route component declared within the Switch below.
    const HomePage = () =>
    {
      return (
        //pass the dish which is featured into the Home component
        <Home
          dish={ this.props.dishes.find((dish) => dish.featured === true) }
          promotion={ this.props.promotions.find((promotion) => promotion.featured === true) }
          leader={ this.props.leaders.find((leader) => leader.featured === true) }
        />
      );
    };

    const DishWithId = ({match}) =>
    {
      return (
        <DishDetail
          dish={this.props.dishes.find((dish) => dish.id === parseInt(match.params.dishId, 10))}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        />
      );
    };

    return (
      <div>
        <Header />

        {/* Switch component from React Router groups together several routes */}
        <Switch>
          {/* Route component from React Router specifies the navigation path to reach that resource */}
          <Route path="/home" component={HomePage} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />

          {/* exact attribute means path should match exactly this to route to that component.
              So for instance if a parameter to menu is passed in /menu/:dishId as below, it would
              also match the /menu path and never go to the "dishId" route.
              We can pass the name of the component directly into the component attribute but this
              will not allow us to pass props into it like we would with the JSX <Component />
              notation. This is why we create it using the following syntax; declaring a function
              that returns the component's name along with the props we pass in a JSX format */}
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />

          {/* :dishId will mark that path as a parameter, which will pass in three object
              parameters into the component (DishWithId), among them the match object,
              from which the parameter can be extracted with match.params.dishId */}
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />

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

//if we weren't using React Router we would only need the connect((mapStateToProps)(Main) part
export default withRouter(connect(mapStateToProps)(Main));
