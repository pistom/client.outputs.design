import React from 'react';
import { NavLink } from 'react-router-dom';
import cssmodules from 'react-css-modules';
import styles from './navigation.cssmodule.scss';

const Navigation = (props) => {

  return (
    <ul styleName="navigation-component" className="navigation-component">
      <li><NavLink exact to="/" activeStyle={{color:'brown'}}>Home</NavLink></li>

      {Object.keys(props.pages).map((pageName) => {
        return (<li key={pageName}>
          <NavLink
            activeStyle={{color:'brown'}}
            to={`${props.projectId}/${pageName}/${props.urlParams}`}>
            {pageName}
          </NavLink>
        </li>);
      })}

      {props.screen.currentPageName ?
        Object.keys(props.pages[props.screen.currentPageName].devices).map((device => {
          return (<li key={device}>
            <span
              onClick={() => props.actions.changeDevice(device)}
              className={props.screen.currentDevice === device ? 'active' : null}
              style={props.screen.currentDevice === device ? {color: 'brown'} : null}
            >
              {device}
            </span>
          </li>);
        })) : null
      }

      {props.screen.deviceMode ?
        <li><span onClick={() => props.actions.changeDevice(false)} >Responsive</span></li> : null
      }

      {props.numberOfVersions > 1 ?
        (
          <ul>
            <li><span onClick={() => props.actions.splitScreen(1)}>split on</span></li>
            <li><span onClick={() => props.actions.splitScreen(0)}>split off</span></li>
            <li><span onClick={() => props.actions.changeDesignVersion('A')} >ver. A</span></li>
            <li><span onClick={() => props.actions.changeDesignVersion('B')} >ver. B</span></li>
          </ul>
        ) : null}

    </ul>
  );
};

export default cssmodules(Navigation, styles);
