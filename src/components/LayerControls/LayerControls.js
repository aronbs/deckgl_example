import React, { Component } from "react";
import { Setting } from "../../components";
import { LAYER_CONTROL } from "../../consts";

class LayerControls extends Component {
  _onValueChange = (settingName, newValue) => {
    const { settings } = this.props;
    // Only update if we have a confirmed change
    if (settings[settingName] !== newValue) {
      // Create a new object so that shallow-equal detects a change
      const newSettings = { ...settings, [settingName]: newValue };

      this.props.onChange(newSettings);
    }
  };

  render() {
    const { title, settings, controls = {} } = this.props;

    return (
      <div className="layer-controls" style={LAYER_CONTROL}>
        {title && <h4>{title}</h4>}
        {Object.keys(settings).map(key => (
          <div key={key}>
            <label>{controls[key].displayName}</label>
            <div style={{ display: "inline-block", float: "right" }}>
              {settings[key]}
            </div>
            <Setting
              settingName={key}
              value={settings[key]}
              propType={controls[key]}
              onChange={this._onValueChange}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default LayerControls;
