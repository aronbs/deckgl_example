import React, { Component } from "react";
import MapGL from "react-map-gl";
import MapStylePicker from "../MapStylePicker";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: "mapbox://styles/mapbox/dark-v9",
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        longitude: -74,
        latitude: 40.7,
        zoom: 11,
        maxZoom: 16
      }
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeMap);
    this.resizeMap();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeMap);
  }

  resizeMap = () =>
    this.onViewportChange({
      width: window.innerWidth,
      height: window.innerHeight
    });

  onViewportChange = newViewport =>
    this.setState(state => ({
      viewport: { ...state.viewport, ...newViewport }
    }));

  onStyleChange = style => this.setState({ style });

  render() {
    const { style, viewport } = this.state;
    return (
      <div>
        <MapStylePicker
          currentStyle={style}
          onStyleChange={this.onStyleChange}
        />
        <MapGL
          {...viewport}
          mapStyle={style}
          onViewportChange={viewport => this.onViewportChange(viewport)}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
        >
          <div />
        </MapGL>
      </div>
    );
  }
}

export default Map;
