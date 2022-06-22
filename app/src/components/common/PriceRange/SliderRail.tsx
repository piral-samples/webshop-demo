import * as React from 'react';

const railOuterStyle: React.CSSProperties = {
  position: 'absolute',
  transform: 'translate(0%, -50%)',
  width: '100%',
  height: 42,
  borderRadius: 7,
  cursor: 'pointer'
  // border: '1px solid grey',
};

const railInnerStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: 14,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
  backgroundColor: '#d0d0d0'
};

const SliderRail = ({ getRailProps }) => (
  <div>
    <div style={railOuterStyle} {...getRailProps()} />
    <div style={railInnerStyle} />
  </div>
);

export default SliderRail;
