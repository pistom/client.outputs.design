import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './project.cssmodule.scss';
import ActiveLayer from './ActiveLayer';
import CommentsLayer from './CommentsLayer';

const Project = props => (
  <div className="project-component" styleName="project-component">
    <div>
      <div
        styleName="project-component__design"
        style={{
          backgroundImage: `url(${props.imagePath})`,
          backgroundPosition: 'top center',
          height: props.imageHeight,
          width: props.imageWidth,
          backgroundSize: `${props.imageWidth}px ${props.imageHeight}px`
        }}
      />
      <ActiveLayer
        projectId={props.projectId}
        imageHeight={props.imageHeight}
        imageWidth={props.imageWidth}
        activeElements={props.currentPage.active}
        screen={props.screen}
      />
      <CommentsLayer
        imageHeight={props.imageHeight}
        imageWidth={props.imageWidth}
        comments={props.comments}
      />
    </div>
  </div>
);

export default cssmodules(Project, styles);
