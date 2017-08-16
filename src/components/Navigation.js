import React from 'react';
import { NavLink } from 'react-router-dom';
import cssmodules from 'react-css-modules';
import styles from './navigation.cssmodule.scss';

const Navigation = (props) => {

  return (
    <div styleName="navigation-component" className="navigation-component">
      <ul>
        {Object.keys(props.pages).map((pageName) => {
          return (<li key={pageName}>
            <NavLink
              activeStyle={{color:'brown'}}
              to={`/project/${props.projectId}/${pageName}/${props.urlParams}`}
            >
              {pageName}
            </NavLink>
          </li>);
        })}
      </ul>

      <ul>
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
      </ul>


      {props.screen.deviceMode ?
        (
          <ul>
            <li><span onClick={() => props.actions.setZoom(.5) }>0.50</span></li>
            <li><span onClick={() => props.actions.setZoom(.75) }>0.75</span></li>
            <li><span onClick={() => props.actions.setZoom(1) }>1.00</span></li>
            <li><span onClick={() => props.actions.setZoom(1.5) }>1.50</span></li>
            <li><span onClick={() => props.actions.setZoom(2) }>2.00</span></li>
          </ul>
        ) : null
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

      <ul>
        <li><span onClick={() => props.actions.setBgColor('#ffffff')}>white</span></li>
        <li><span onClick={() => props.actions.setBgColor('#000000')}>black</span></li>
        <li><span onClick={() => props.actions.setBgColor('#888888')}>gray</span></li>
        <li><span onClick={() => props.actions.setBgColor('#c13e32')}>red</span></li>
      </ul>

    </div>
  );
};

export default cssmodules(Navigation, styles);
