import React from "react";
import { MAPBOX_MAP_STYLES } from "../utils";

export default ({ currentStyle, onStyleChange }) => {
  return (
    <select
      value={currentStyle}
      className="map-style-picker"
      onChange={({ target: { value } }) => onStyleChange(value)}
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 100
      }}
    >
      {MAPBOX_MAP_STYLES.map(style => (
        <option key={style.value} value={style.value}>
          {style.label}
        </option>
      ))}
    </select>
  );
};
