
import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes.js";

//Reducer function to deal with comment related actions
export const Comments = function(state = COMMENTS, action)
{
  switch(action.type)
  {
    case ActionTypes.ADD_COMMENT:

      let comment = action.payload;

      //generate an ID for the comment here while we don't have a server to do it
      comment.id = state.length;

      //timestamp the comment created
      comment.date = new Date().toISOString();

      //use the concat Array method as it doesn't modify the original array
      //(state must NOT be mutated in Redux)
      return state.concat(comment);

    default:
      return state;
  }
}
