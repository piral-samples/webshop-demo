import * as React from "react";

const Track = ({ source, target, getTrackProps, disabled = false }) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(0%, -50%)",
      height: 14,
      zIndex: 1,
      backgroundColor: disabled ? "#ffd993" : "#ffa500",
      borderRadius: 7,
      cursor: "pointer",
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);

export default Track;
