
import * as ActionTypes from "./ActionTypes.js";

const initialState = { errMess: null, comments: [] };

//Reducer function to deal with comment related actions
export const Comments = function(state = initialState, action)
{
  switch(action.type)
  {
    case ActionTypes.ADD_DISHES:
      return {...state, isLoading: false, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, comments: []};

    case ActionTypes.ADD_COMMENT:

      let comment = action.payload;

      //generate an ID for the comment here while we don't have a server to do it
      comment.id = state.comments.length;

      //timestamp the comment created
      comment.date = new Date().toISOString();

      //use the concat Array method as it doesn't modify the original array
      //(state must NOT be mutated in Redux)
      return {...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};
