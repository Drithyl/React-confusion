
import { DISHES } from "../shared/dishes";

//Must not modify the state directly in the reducer function;
//it can only make an immutable change and return the update.
//The state's parameter default value is the initial state
//we defined. When the reducer is first called by the store,
//the store will have no state to keep track of, thus the
//parameter would be undefined without a default
export const Dishes = function(state = DISHES, action)
{
  switch(action.type)
  {
    default:
      return state;
  }
}
