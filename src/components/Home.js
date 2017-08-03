import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './home.cssmodule.scss';

class Home extends React.Component {

  render() {
    return (
      <div className="home-component" styleName="home-component">
        <h1>outputs.design</h1>
      </div>
    );
  }
}

Home.displayName = 'Home';
Home.propTypes = {};
Home.defaultProps = {};

export default cssmodules(Home, styles);
