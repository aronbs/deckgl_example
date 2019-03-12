import React from "react";
import { Checkbox, Slider } from "../../components";

function Setting(props) {
  const { propType } = props;
  if (propType && propType.type) {
    switch (propType.type) {
      case "range":
        return <Slider {...props} />;
      case "boolean":
        return <Checkbox {...props} />;
      default:
        return <input {...props} />;
    }
  }
}

export default Setting;
