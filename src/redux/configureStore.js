
import { createStore } from "redux";
import { Reducer, initialState } from "./reducer.js";

export const ConfigureStore = () =>
{
  //createStore() mainly takes the reducer function and the state as parameters
  const store = createStore(Reducer, initialState);
  return store;
};
