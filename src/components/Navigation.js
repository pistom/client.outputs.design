import React from 'react';
import { Link } from 'react-router-dom';
import cssmodules from 'react-css-modules';
import styles from './navigation.cssmodule.scss';

const Navigation = (props) => {

  return (
    <ul styleName="navigation-component" className="navigation-component">
      <li><Link to="/">Home</Link></li>
      <li><Link to={`${props.projectId}/Homepage/${props.urlParams}`}>Homepage</Link></li>
      <li><Link to={`${props.projectId}/AboutUs/${props.urlParams}`}>About Us</Link></li>
      <li><Link to={`${props.projectId}/Blog/${props.urlParams}`}>Blog</Link></li>
      <li><Link to={`${props.projectId}/Contact/${props.urlParams}`}>Contact</Link></li>

      <li><span onClick={() => props.actions.splitScreen(1)}>split on</span></li>
      <li><span onClick={() => props.actions.splitScreen(0)}>split off</span></li>
      <li><span onClick={() => props.actions.changeDesignVersion('A')} >ver. A</span></li>
      <li><span onClick={() => props.actions.changeDesignVersion('B')} >ver. B</span></li>
      <li><span onClick={() => props.actions.changeDevice('Small')} >Small</span></li>
      <li><span onClick={() => props.actions.changeDevice('Medium')} >Medium</span></li>
      <li><span onClick={() => props.actions.changeDevice('Large')} >Large</span></li>
      <li><span onClick={() => props.actions.changeDevice(false)} >Responsive</span></li>

    </ul>
  );
}

export default cssmodules(Navigation, styles);
