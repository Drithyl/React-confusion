
import * as ActionTypes from "./ActionTypes.js";
import { DISHES } from "../shared/dishes";

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

    //simulate server fetching waiting time and dispatch the action to add
    //the dishes data to the store once the previous action is successful
    setTimeout(() =>
    {
      dispatch(addDishes(DISHES));

    }, 2000);
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
