import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './app.css';
import Screen from './Screen';
import Home from './Home';

class AppComponent extends React.Component {


  render() {
    return (
      <Router>
        <div className="container">
          <Link to="/">Home</Link> | <Link to="/Homepage">Homepage</Link>
          <Route exact path="/" component={Home} />
          <Route path="/:page/:device?" component={Screen} />
        </div>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
