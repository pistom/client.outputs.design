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
  componentDidMount() {
    console.log(this.props.actions);
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Link to="/">Home</Link>
          <Link to="/Homepage">Homepage</Link>
          <Link to="/AboutUs">About Us</Link>
          <Link to="/Blog">Blog</Link>
          <Link to="/Contact">Contact</Link>
          <Route exact path="/" component={Home} />
          <Route path="/:page/:version?/:device?" component={Screen} />
        </div>
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
