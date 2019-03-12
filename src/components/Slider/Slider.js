import React from "react";

function Slider({ settingName, value, propType, onChange }) {
  const { max = 100 } = propType;

  return (
    <div key={settingName}>
      <div className="input-group">
        <div>
          <input
            type="range"
            id={settingName}
            min={0}
            max={max}
            value={value}
            step={max / 100}
            onChange={({ target: { value } }) =>
              onChange(settingName, Number(value))
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Slider;
