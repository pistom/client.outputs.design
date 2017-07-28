import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './home.cssmodule.sass';

class Home extends React.Component {

  render() {
    return (
      <div className="home-component" styleName="home-component">
        Please edit src\components\Home.js to update this component!
      </div>
    );
  }
}

Home.displayName = 'Home';
Home.propTypes = {};
Home.defaultProps = {};

export default cssmodules(Home, styles);
