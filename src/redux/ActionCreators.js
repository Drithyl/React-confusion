
import * as ActionTypes from "./ActionTypes.js";
import { baseUrl } from "../shared/baseUrl";

//We define here the action creator function for the ADD_COMMENT action
//This is the function that will return our action object to be dispatched
//into the store
export const addComment = function(comment)
{
  return {

    type: ActionTypes.ADD_COMMENT,
    payload: comment
  };
};

export const postComment = function(dishId, rating, author, comment)
{
  return function(dispatch)
  {
    const newComment =
    {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
      date: new Date().toISOString()
    };

    return fetch(`${baseUrl}/comments`, {

      //when method is not specified it'll default to GET
      method: "POST",
      //POST requires you to send a body
      body: JSON.stringify(newComment),
      headers:
      {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then((response) =>
    {
      if (response.ok === true)
      {
        return response;
      }

      else
      {
        let error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    }, (err) =>
    {
      throw new Error(err.message);
    })
    .then((response) => response.json())
    //server response should contain the updated comment with an id as well
    .then((response) => dispatch(addComment(response)))
    .catch((err) =>
    {
      console.log(`Post comments`, err.message);
      alert(`Your comment could not be posted\nError: ${err.message}`);
    });
  }
};

export const postFeedback = function(values)
{
  return function(dispatch)
  {
    const feedback =
    {
      firstname: values.firstname,
      lastname: values.lastname,
      telnum: values.telnum,
      email: values.email,
      agree: values.agree,
      contactType: values.contactType,
      message: values.message
    };

    return fetch(`${baseUrl}/feedback`, {

      //when method is not specified it'll default to GET
      method: "POST",
      //POST requires you to send a body
      body: JSON.stringify(feedback),
      headers:
      {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then((response) =>
    {
      if (response.ok === true)
      {
        alert(`Thank you for your feedback!: ${JSON.stringify(feedback, null, 2)}`);
        return response;
      }

      else
      {
        let error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    }, (err) =>
    {
      throw new Error(err.message);
    })
    .then((response) => response.json())
    .catch((err) =>
    {
      console.log(`Feedback:`, err.message);
      alert(`Your feedback could not be sent\nError: ${err.message}`);
    });
  }
};

//thunk. A thunk is a subroutine used to inject additional calculations into
//another subroutine. This is why it returns another function
export const fetchDishes = function()
{
  return function(dispatch)
  {
    //dispatch the dishesLoading action
    dispatch(dishesLoading(true));

    //fetch (cross-fetch) is inluded in React automatically when using the CreateReactApp()?
    return fetch(`${baseUrl}/dishes`)
      .then((response) =>
      {
        //check if request went well; if so return the response normally
        //which will be passed on to the next promise handler below
        if (response.ok === true)
        {
          return response;
        }

        else
        {
          let error = new Error(`Error ${response.status}: ${response.statusText}`);
          error.response = response;

          //throwing the error within the promise will direct it to the catch statement
          throw error;
        }
      }, (err) =>
      {
        //error happened in communicating with server, without getting a response
        throw new Error(err.message);
      })
      //convert response's body into json
      .then((response) => response.json())
      .then((dishes) =>
      {
        return dispatch(addDishes(dishes));
      })
      .catch((err) => dispatch(dishesFailed(err.message)));
  }
};

//action that will inform that dishes are being loaded
export const dishesLoading = function()
{
  return { type: ActionTypes.DISHES_LOADING }
};

export const dishesFailed = function(errmess)
{
  return {

    type: ActionTypes.DISHES_FAILED,
    payload: errmess
  };
};

export const addDishes = function(dishes)
{
  return {

    type: ActionTypes.ADD_DISHES,
    payload: dishes
  };
};

export const fetchComments = function()
{
  return function(dispatch)
  {
    return fetch(`${baseUrl}/comments`)
      .then((response) =>
      {
        if (response.ok === true)
        {
          return response;
        }

        else
        {
          let error = new Error(`Error ${response.status}: ${response.statusText}`);
          error.response = response;
          throw error;
        }
      }, (err) =>
      {
        throw new Error(err.message);
      })
      //convert response's body into json
      .then((response) => response.json())
      .then((comments) =>
      {
        return dispatch(addComments(comments));
      })
      .catch((err) => dispatch(commentsFailed(err.message)));
  }
};

export const commentsFailed = function(errmess)
{
  return {

    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
  };
};

export const addComments = function(comments)
{
  return {

    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  };
};

export const fetchPromos = function()
{
  return function(dispatch)
  {
    dispatch(promosLoading(true));

    return fetch(`${baseUrl}/promotions`)
      .then((response) =>
      {
        if (response.ok === true)
        {
          return response;
        }

        else
        {
          let error = new Error(`Error ${response.status}: ${response.statusText}`);
          error.response = response;
          throw error;
        }
      }, (err) =>
      {
        throw new Error(err.message);
      })
      .then((response) => response.json())
      .then((promos) =>
      {
        return dispatch(addPromos(promos));
      })
      .catch((err) => dispatch(promosFailed(err.message)));
  }
};

export const promosLoading = function()
{
  return { type: ActionTypes.PROMOS_LOADING }
};

export const promosFailed = function(errmess)
{
  return {

    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
  };
};

export const addPromos = function(promos)
{
  return {

    type: ActionTypes.ADD_PROMOS,
    payload: promos
  };
};

export const fetchLeaders = function()
{
  return function(dispatch)
  {
    dispatch(leadersLoading(true));

    return fetch(`${baseUrl}/leaders`)
      .then((response) =>
      {
        if (response.ok === true)
        {
          return response;
        }

        else
        {
          let error = new Error(`Error ${response.status}: ${response.statusText}`);
          error.response = response;
          throw error;
        }
      }, (err) =>
      {
        throw new Error(err.message);
      })
      .then((response) => response.json())
      .then((leaders) =>
      {
        return dispatch(addLeaders(leaders));
      })
      .catch((err) => dispatch(leadersFailed(err.message)));
  }
};

export const leadersLoading = function()
{
  return { type: ActionTypes.LEADERS_LOADING }
};

export const leadersFailed = function(errmess)
{
  return {

    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
  };
};

export const addLeaders = function(leaders)
{
  return {

    type: ActionTypes.ADD_LEADERS,
    payload: leaders
  };
};
