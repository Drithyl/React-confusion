
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishes.js";
import { Comments } from "./comments.js";
import { Promotions } from "./promotions.js";
import { Leaders } from "./leaders.js";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () =>
{
  //createStore() mainly takes the reducer function and the state as parameters.
  //Can also take a combineReducers function, as well as enhancers (middlewares)
  //through the redux function applyMiddleware()
  const store = createStore(
    //Redux provided function to combine all of our separate reducer functions
    //into a single one, mapping them each to a different object key
    combineReducers(
    {
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders
    }),

    //enhancers. thunk allows us to return functions instead of action objects,
    //so that the dispatches can be intervened and operated on to log state,
    //condition them, fetch resources from a server, etc.
    applyMiddleware(thunk, logger)
  );
  return store;
};
