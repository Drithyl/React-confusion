
import * as ActionTypes from "./ActionTypes.js";

const initialState =
{
  //will be true whenever dishes are being loaded from the server
  isLoading: true,
  //will contain the error message whenever loading dishes failed
  errMessage: null,
  //will contain all the dishes loaded successfully
  dishes: []
}

//Must not modify the state directly in the reducer function;
//it can only make an immutable change and return the update.
//The state's parameter default value is the initial state
//we defined. When the reducer is first called by the store,
//the store will have no state to keep track of, thus the
//parameter would be undefined without a default
export const Dishes = function(state = initialState, action)
{
  switch(action.type)
  {
    //ADD_DISHES carries the loaded dishes as the payload
    case ActionTypes.ADD_DISHES:
      return {...state, isLoading: false, errMess: null, dishes: action.payload};

    case ActionTypes.DISHES_LOADING:
      //... operator expands the state properties into this object,
      //cloning it without keeping the references, making it safe to
      //modify while preserving immutability. The rest of the properties
      //added will be either added as new ones (if they are new keys)
      //or will override the state's properties if they are the same
      return {...state, isLoading: true, errMess: null, dishes: []};

    //DISHES_FAILED action carries the errMess as its payload
    case ActionTypes.DISHES_FAILED:
      return {...state, isLoading: false, errMess: action.payload, dishes: []};

    default:
      return state;
  }
};
