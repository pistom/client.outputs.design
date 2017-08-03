import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import history from '../history';
import './app.css';
import Screen from './Screen';
import Home from './Home';
import Navigation from './Navigation';
import PageNotFound from './404';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.navigationActions = {
      splitScreen: this._handleSplitScreen.bind(this),
      changeDesignVersion: this._handleChangeDesignVersion.bind(this),
      changeDevice: this._handleChangeDevice.bind(this)
    };
    this.projectId = '/projectid';
  }
  _handleSplitScreen(split) {
    this.props.actions.setSplitScreen(split);
    this.props.actions.setCurrentDesignVersion('A');
    // TODO Change mode of dispatch history.push action
    console.log(this.generateUrl());
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleChangeDesignVersion(design) {
    this.props.actions.setCurrentDesignVersion(design);
    // TODO Change mode of dispatch history.push action
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleChangeDevice(device) {
    if (device) {
      this.props.actions.setCurrentDevice(device);
      this.props.actions.setDeviceMode(true);
    } else {
      this.props.actions.setDeviceMode(false);
    }
    // TODO Change mode of dispatch history.push action
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  generateUrl() {
    return `${this.projectId}/${this.props.screen.currentPageName}/${this.generateUrlParams()}`;
  }

  generateUrlParams() {
    const urlElems = [];
    urlElems.push(this.props.screen.currentDesignVersion);
    if (this.props.screen.deviceMode) {
      urlElems.push(this.props.screen.currentDevice);
    }
    let splitScreen = '';
    if (this.props.screen.splitScreen > 0) {
      splitScreen = `?splitScreen=${this.props.screen.splitScreen}`;
    }
    return urlElems.join('/') + splitScreen;
  }

  render() {
    this.screenInfo = {
      currentDesignVersion: this.props.screen.currentDesignVersion,
      currentPageName: this.props.screen.currentPageName
    };

    return (
      <Router>
        <div>
          <Navigation projectId={this.projectId} urlParams={this.generateUrlParams()} actions={this.navigationActions} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/help" render={() => <div>Help</div>} />
            <Route path={`${this.projectId}/:page/:version?/:device?`} component={Screen} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
