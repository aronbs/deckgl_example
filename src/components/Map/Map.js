/* global window */
import React, { Component } from "react";
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";

import taxiData from "../../data/taxi";
import { renderLayers } from "../../layers";
import { LayerControls, MapStylePicker } from "../../components";
import { SCATTERPLOT_CONTROLS, TOOLTIP_STYLE } from "../../consts";

const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.7,
  zoom: 11,
  minZoom: 5,
  maxZoom: 16,
  pitch: 0,
  bearing: 0
};

export default class App extends Component {
  state = {
    hover: {
      x: 0,
      y: 0,
      hoveredObject: null
    },
    points: [],
    settings: Object.keys(SCATTERPLOT_CONTROLS).reduce(
      (accu, key) => ({ ...accu, [key]: SCATTERPLOT_CONTROLS[key].value }),
      {}
    ),
    style: "mapbox://styles/mapbox/dark-v9"
  };

  componentDidMount() {
    this.addMapData();
  }

  addMapData = () => {
    const points = taxiData.reduce(
      (
        accu,
        {
          dropoff_longitude,
          dropoff_latitude,
          pickup_longitude,
          pickup_latitude,
          ...data
        },
        index
      ) => {
        if (index === 1) {
          console.log("accu:", accu);
          console.log("data:", data);
        }

        accu.push({
          position: [Number(pickup_longitude), Number(pickup_latitude)],
          pickup: true
        });

        accu.push({
          position: [Number(dropoff_longitude), Number(dropoff_latitude)],
          pickup: false
        });
        return accu;
      },
      []
    );
    this.setState({ points });
  };

  onHover({ x, y, object }) {
    const label = object ? (object.pickup ? "Pickup" : "Dropoff") : null;

    this.setState({ hover: { x, y, hoveredObject: object, label } });
  }

  onStyleChange = style => this.setState({ style });

  updateLayerSettings = settings => this.setState({ settings });

  render() {
    const { hover, points, settings, style } = this.state;

    if (!points.length) return null;

    return (
      <div>
        {hover.hoveredObject && (
          <div
            style={{
              ...TOOLTIP_STYLE,
              transform: `translate(${hover.x}px, ${hover.y}px)`
            }}
          >
            <div>{hover.label}</div>
          </div>
        )}
        <MapStylePicker
          currentStyle={style}
          onStyleChange={this.onStyleChange}
        />
        <LayerControls
          settings={settings}
          controls={SCATTERPLOT_CONTROLS}
          onChange={newSettings => this.updateLayerSettings(newSettings)}
        />
        <DeckGL
          layers={renderLayers({
            data: points,
            onHover: positionData => this.onHover(positionData),
            settings
          })}
          initialViewState={INITIAL_VIEW_STATE}
          controller
        >
          <StaticMap
            mapStyle={style}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN}
          />
        </DeckGL>
      </div>
    );
  }
}
