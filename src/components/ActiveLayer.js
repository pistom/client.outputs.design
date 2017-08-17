import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './activeLayer.cssmodule.scss';
import { NavLink } from 'react-router-dom';
import { Utils } from './App';

const ActiveLayer = props => {

  return (
    <div
      className="activeLayer-component"
      styleName="activeLayer-component"
      style={{
        height: props.imageHeight,
        width: props.imageWidth
      }}
    >
      { props.activeElements ? Object.keys(props.activeElements.btns).map((btn) => {
        let button = props.activeElements.btns[btn];
        return (
          <NavLink
            to={`/project/${props.projectId}/${button.page}/${Utils.generateUrlParams(props.screen)}`}
            key={button.page}
            styleName="activeLayer-component__btn"
            style={{
              left: button.box[0],
              top: button.box[1],
              width: button.box[2],
              height: button.box[3]
            }}
          >
            {/*{button.page}*/}
          </NavLink>
        );
      }) : null
      }
    </div>
  );
};

export default cssmodules(ActiveLayer, styles);
