
import React, { Component } from 'react';

//withRouter is required to configure our React component to connect to the Redux store
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

//will be used at the bottom in the export statement to link the component to the store
import { connect } from "react-redux";

//import the addComment action creator so the action objects can be created and dispatched
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";

//import premade actions from the react-redux-form module to access actions.reset
//to easily reset a form's state
import { actions } from "react-redux-form";

//animation package
import { TransitionGroup, CSSTransition } from "react-transition-group";

//import our own components
import Home from "./HomeComponent.js";
import About from "./AboutComponent.js";
import Menu from "./MenuComponent.js";
import Contact from "./ContactComponent.js";
import DishDetail from "./DishdetailComponent.js";
import Header from "./HeaderComponent.js";
import Footer from "./FooterComponent.js";

//will map the redux store's state that will
//become available to this component as props
const mapStateToProps = (state) =>
{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

//takes the dispatch store's function as a parameter. This makes available all
//the different action dispatch functions to the props of the component that is
//enclosed by the connect function as seen at the bottom of this file
const mapDispatchToProps = function(dispatch)
{
  return {

    //dispatch property; defines function to dispatch an addComment action
    postComment: (dishId, rating, author, comment) =>
    {
      //dispatch function from the store supplied as parameter. Whenever the above
      //addComment property is invoked, the addComment action returned below will
      //get dispatched
      return dispatch(
        //ActionCreator function for adding comments that returns the action object
        postComment(dishId, rating, author, comment)
      );
    },

    postFeedback: (values) =>
    {
      return dispatch(
        postFeedback(values)
      );
    },

    fetchDishes: () =>
    {
      return dispatch(fetchDishes());
    },

    fetchComments: () =>
    {
      return dispatch(fetchComments());
    },

    fetchPromos: () =>
    {
      return dispatch(fetchPromos());
    },

    fetchLeaders: () =>
    {
      return dispatch(fetchLeaders());
    },

    resetFeedbackForm: () =>
    {
      return dispatch(actions.reset("feedback"));
    }
  }
};

//create an App component that will then be exported to be rendered in index.js
class Main extends Component {

  constructor(props) {
    super(props);
  }

  //React lifecycle method that gets executed when this component
  //was mounted in the view, the perfect time to fetch application data
  componentDidMount()
  {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render ()
  {
    //We will specify further props into the Home component here. This could also
    //be used for the Menu Route component declared within the Switch below.
    const HomePage = () =>
    {
      return (
        //pass the dish which is featured into the Home component. dishes info
        //is now inside of dishes.dishes, since dishes is now a state that also
        //contains other props like isLoading (defined in redux/dishes.js)
        <Home
          dish={ this.props.dishes.dishes.find((dish) => dish.featured === true) }
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={ this.props.promotions.promotions.find((promotion) => promotion.featured === true) }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={ this.props.leaders.leaders.find((leader) => leader.featured === true) }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({match}) =>
    {
      //Pass the postComment dispatch action function into the DishDetail component.
      //This function is defined above in the mapDispatchToProps function, and is
      //made available to the Main component here by the connect() function used
      //at the bottom of this file.
      return (
        <DishDetail
          dish={this.props.dishes.dishes.find((dish) => dish.id === parseInt(match.params.dishId, 10))}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />

          <TransitionGroup>
            {/* Attributes required for the react-transition-group package */}
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>

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

                {/* Pass the resetFeedbackForm dispatch method to be able to reset the feedback form there */}
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />

                {/* Redirect React Router component allows us to specify a default route that will be
                    used whenever the URL provided does not match any of the Routes specified above.
                    The to attribute will specify which Route the user is redirected to */}
                <Redirect to="/home" />
              </Switch>

            </CSSTransition>
          </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

//if we weren't using React Router we would only need the connect((mapStateToProps)(Main) part
//
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
