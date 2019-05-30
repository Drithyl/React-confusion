
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

export const initialState =
{
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS
};

//Must not modify the state directly in the reducer function;
//it can only make an immutable change and return the update.
//The state's parameter default value is the initial state
//we defined. When the reducer is first called by the store,
//the store will have no state to keep track of, thus the
//parameter would be undefined without a default
export const Reducer = (state = initialState, action) =>
{
  return state;
};
