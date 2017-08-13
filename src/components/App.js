import React from 'react';
import {
  BrowserRouter as Router,
  Route,
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
    this.projectId = 'aFt2T8q71q';
    this.navigationActions = {
      splitScreen: this._handleSplitScreen.bind(this),
      changeDesignVersion: this._handleChangeDesignVersion.bind(this),
      changeDevice: this._handleChangeDevice.bind(this),
      setZoom: this._handleSetZoom.bind(this),
      setBgColor: this._handleSetBgColor.bind(this)
    };
  }

  componentDidMount() {
    this.props.actions.getProjectData(this.projectId);
  }

  _handleSplitScreen(split) {
    this.props.actions.setSplitScreen(split);
    this.props.actions.setCurrentDesignVersion('A');
    // TODO Change mode of dispatch history.push action
    // console.log(this.generateUrl());
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleSetBgColor(color) {
    this.props.actions.setBgColor(color);
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
      this.props.actions.showDevice(true);
    } else {
      this.props.actions.setDeviceMode(false);
      this.props.actions.showDevice(false);
      this.props.actions.setZoom(1, false);
    }
    // TODO Change mode of dispatch history.push action
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleSetZoom(zoom) {
    this.props.actions.setZoom(zoom);
  }

  generateUrl() {
    return `/project/${this.projectId}/${this.props.screen.currentPageName}/${this.generateUrlParams()}`;
  }

  generateUrlParams() {
    const urlElems = [];
    urlElems.push(this.props.screen.currentDesignVersion);
    if (this.props.screen.deviceMode) {
      urlElems.push(this.props.screen.currentDevice);
    }
    let locationSearch = '?';
    if (this.props.screen.splitScreen > 0) {
      locationSearch += `splitScreen=${this.props.screen.splitScreen}&`;
    }
    if (this.props.screen.bgColor) {
      locationSearch += `bgColor=${encodeURIComponent(this.props.screen.bgColor)}&`;
    }
    if (this.props.screen.bgImage) {
      locationSearch += `bgImage=${encodeURIComponent(this.props.screen.bgImage)}&`;
    }
    return urlElems.join('/') + locationSearch.slice(0, -1);
  }

  render() {
    return (
      <Router>
        { !this.props.data.isLoadingData && !this.props.data.loadingDataError ?
          (
            <div>
              <Navigation
                projectId={this.projectId}
                numberOfVersions={this.props.data.numberOfVersions}
                pages={this.props.data.pages}
                screen={this.props.screen}
                urlParams={this.generateUrlParams()}
                actions={this.navigationActions} />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/help" render={() => <div>Help</div>} />
                <Route path={`/project/${this.projectId}/:page/:version?/:device?`} component={Screen} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          ) : null
        }
      </Router>

    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
