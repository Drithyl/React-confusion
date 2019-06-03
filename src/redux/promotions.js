
import * as ActionTypes from "./ActionTypes.js";

const initialState =
{
  isLoading: true,
  errMessage: null,
  dishes: []
}

export const Promotions = function(state = initialState, action)
{
  switch(action.type)
  {
    case ActionTypes.ADD_PROMOS:
      return {...state, isLoading: false, errMess: null, promotions: action.payload};

    case ActionTypes.PROMOS_LOADING:
      return {...state, isLoading: true, errMess: null, promotions: []};

    case ActionTypes.PROMOS_FAILED:
      return {...state, isLoading: false, errMess: action.payload, promotions: []};

    default:
      return state;
  }
};
