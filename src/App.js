import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";

//import our own components
import Main from "./components/MainComponent.js";

import './App.css';

//create an App component that will then be exported to be rendered in index.js
class App extends Component {

  render ()
  {
    return (
      //BrowserRouter needs to be enclosing our application to be able to use
      //the React Router features.
      <BrowserRouter>
        <div>

          {/* To render our component we simply need to include it as a self closing tag.
              This one then gets rendered in index.js as part of the App component,
              building a single complex component out of many different ones */}
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
