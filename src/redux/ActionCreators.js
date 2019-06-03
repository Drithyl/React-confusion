
import * as ActionTypes from "./ActionTypes.js";
import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

//We define here the action creator function for the ADD_COMMENT action
//This is the function that will return our action object to be dispatched
//into the store
export const addComment = function(dishId, rating, author, comment)
{
  return {

    type: ActionTypes.ADD_COMMENT,
    payload:
    {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
    }
  };
};

//thunk. A thunk is a subroutine used to inject additional calculations into
//another subroutine. This is why it returns another function
export const fetchDishes = function()
{
  return function(dispatch)
  {
    //dispatch the dishesLoading action
    dispatch(dishesLoading(true));

    return fetch(`${baseUrl}/dishes`)
      //convert response's body into json
      .then((response) => response.json())
      .then((dishes) =>
      {
        return dispatch(addDishes(dishes));
      });
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
      //convert response's body into json
      .then((response) => response.json())
      .then((comments) =>
      {
        return dispatch(addComments(comments));
      });
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
      .then((response) => response.json())
      .then((promos) =>
      {
        return dispatch(addPromos(promos));
      });
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
