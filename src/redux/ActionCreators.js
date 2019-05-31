
import * as ActionTypes from "./ActionTypes.js";

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
