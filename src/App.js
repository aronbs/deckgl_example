import React, { Component } from "react";
import { Map } from "./components";

import "mapbox-gl/dist/mapbox-gl.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
