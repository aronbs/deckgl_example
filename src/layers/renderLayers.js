import { ScatterplotLayer } from "deck.gl";

const PICKUP_COLOR = [0, 128, 255];
const DROPOFF_COLOR = [255, 0, 128];

export function renderLayers(props) {
  const { data, onHover, settings } = props;
  // console.log("data:", data);
  // console.log("settings:", settings);
  return [
    settings.showScatterplot &&
      new ScatterplotLayer({
        id: "scatterplot-layer",
        getPosition: d => d.position,
        getFillColor: d => (d.pickup ? PICKUP_COLOR : DROPOFF_COLOR),
        getRadius: d => 5,
        opacity: 0.5,
        pickable: true,
        radiusMinPixels: 0.25,
        radiusMaxPixels: 30,
        data,
        onHover,
        ...settings
      })
  ];
}
