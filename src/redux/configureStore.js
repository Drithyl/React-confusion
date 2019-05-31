
import { createStore, combineReducers } from "redux";
import { Dishes } from "./dishes.js";
import { Comments } from "./comments.js";
import { Promotions } from "./promotions.js";
import { Leaders } from "./leaders.js";

export const ConfigureStore = () =>
{
  //createStore() mainly takes the reducer function and the state as parameters
  const store = createStore(
    //Redux provided function to combine all of our separate reducer functions
    //into a single one, mapping them each to a different object key
    combineReducers(
    {
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders
    })
  );
  return store;
};
