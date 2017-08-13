import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './project.cssmodule.scss';
import ActiveLayer from './ActiveLayer';

const Project = props => (
  <div className="project-component" styleName="project-component">
    { !props.isLoading ?
      (
        <div>
          <div
            styleName="project-component__design"
            style={{
              backgroundImage: `url(${props.imagePath})`,
              backgroundPosition: 'top center',
              height: props.imageHeight,
              width: props.imageWidth,
              backgroundSize: 'contain'
              // backgroundSize: `${props.imageWidth}px ${props.imageHeight}px`
            }}
          />
          <ActiveLayer
            imageHeight={props.imageHeight}
            imageWidth={props.imageWidth}
          />
        </div>
      ) : (<span styleName="project-component__loadingSpinner" />)
    }
  </div>
);

export default cssmodules(Project, styles);
