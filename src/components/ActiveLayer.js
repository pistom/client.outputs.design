import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './activeLayer.cssmodule.scss';

const ActiveLayer = props => {
  return(
    <div
      className="activeLayer-component"
      styleName="activeLayer-component"
      style={{
        height: props.imageHeight,
        width: props.imageWidth
      }}
    >

    </div>
  )
};

export default cssmodules(ActiveLayer, styles);
