import React, { Component } from 'react';

//import our own components
import Main from "./components/MainComponent.js";

import './App.css';

//create an App component that will then be exported to be rendered in index.js
class App extends Component {

  render ()
  {
    return (
      <div>

        {/* To render our component we simply need to include it as a self closing tag.
            This one then gets rendered in index.js as part of the App component,
            building a single complex component out of many different ones */}
        <Main />
      </div>
    );
  }
}

export default App;
