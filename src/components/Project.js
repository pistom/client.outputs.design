import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './project.cssmodule.scss';
import ActiveLayer from './ActiveLayer';

const Project = props => (
  <div className="project-component" styleName="project-component">
    <div
      styleName="project-component__design"
      style={{
        backgroundImage: props.filePath,
        backgroundPosition: 'top center',
        height: props.imageHeight,
        width: props.imageWidth
      }}
    />
    <ActiveLayer
      imageHeight={props.imageHeight}
      imageWidth={props.imageWidth}
    />
  </div>
);

export default cssmodules(Project, styles);
