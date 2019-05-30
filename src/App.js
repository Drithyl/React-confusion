import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

//allows configuration of the React application to make the store available
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

//import our own components
import Main from "./components/MainComponent.js";

import './App.css';

const store = ConfigureStore();

//create an App component that will then be exported to be rendered in index.js
class App extends Component {



  render ()
  {
    return (
      //Surround our React application with the Provider component so the redux
      //store becomes available to all of it.
      <Provider store={store}>
        {/* BrowserRouter needs to be enclosing our application
            to be able to use the React Router features. */}
        <BrowserRouter>
          <div>

            {/* To render our component we simply need to include it as a self closing tag.
                This one then gets rendered in index.js as part of the App component,
                building a single complex component out of many different ones */}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
