import React from "react";

function Checkbox({ settingName, value, onChange }) {
  return (
    <div key={settingName}>
      <div className="input-group">
        <input
          type="checkbox"
          checked={value}
          id={settingName}
          onChange={({ target: { checked } }) => onChange(settingName, checked)}
        />
      </div>
    </div>
  );
}

export default Checkbox;
