import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import history from '../history';
import './app.css';
import Screen from './Screen';
import Navigation from './Navigation';
import PageNotFound from './404';
import Login from './Login';

export class Utils {
  static generateUrlParams(screen) {
    const urlElems = [];
    urlElems.push(screen.currentDesignVersion);
    if (screen.deviceMode) {
      urlElems.push(screen.currentDevice);
    }
    let locationSearch = '?';
    if (screen.splitScreen > 0) {
      locationSearch += `splitScreen=${screen.splitScreen}&`;
    }
    if (screen.bgColor) {
      locationSearch += `bgColor=${encodeURIComponent(screen.bgColor)}&`;
    }
    if (screen.bgImage) {
      locationSearch += `bgImage=${encodeURIComponent(screen.bgImage)}&`;
    }
    return urlElems.join('/') + locationSearch.slice(0, -1);
  }
}

class AppComponent extends React.Component {
  constructor() {
    super();
    this.navigationActions = {
      splitScreen: this._handleSplitScreen.bind(this),
      changeDesignVersion: this._handleChangeDesignVersion.bind(this),
      changeDevice: this._handleChangeDevice.bind(this),
      setZoom: this._handleSetZoom.bind(this),
      setBgColor: this._handleSetBgColor.bind(this),
      setBgImage: this._handleSetBgImage.bind(this)
    };
    const projectId = window.location.pathname.split('/')[2];
    this.state = {projectId};
  }

  componentDidMount() {
    if (this.state.projectId) {
      this.props.actions.getProjectData(this.state.projectId);
      const currentPageName = window.location.pathname.split('/')[3] || null;
      this.props.actions.setCurrentPageName(currentPageName);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.projectId !== nextProps.data.projectId) {
      this.setState({
        projectId: nextProps.data.projectId
      });
    }
  }

  _handleSplitScreen(split) {
    this.props.actions.setSplitScreen(split);
    this.props.actions.setCurrentDesignVersion('A');
    // TODO Change mode of dispatch history.push action
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleSetBgColor(color) {
    this.props.actions.setBgColor(color);
    this.props.actions.setBgImage(undefined);
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleSetBgImage(bg) {
    this.props.actions.setBgImage(bg);
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleChangeDesignVersion(design) {
    this.props.actions.setCurrentDesignVersion(design);
    // TODO Change mode of dispatch history.push action
    setTimeout(() => {
      history.push(`${this.generateUrl()}`);
      // this.props.actions.setLoadingImage(false);
    }, 100);
  }

  _handleChangeDevice(device) {
    if (device) {
      this.props.actions.setCurrentDevice(device);
      this.props.actions.setDeviceMode(true);
      this.props.actions.showDevice(true);
      if (this.props.data.devices[device].defaultBgImage) {
        this.props.actions.setBgImage(this.props.data.devices[device].defaultBgImage);
      }
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
    return `/project/${this.state.projectId}/${this.props.screen.currentPageName}/${Utils.generateUrlParams(this.props.screen)}`;
  }

  render() {
    return (
      <Router>
        { !this.props.data.isLoadingData &&
          !this.props.data.loadingDataError &&
          !this.props.data.error ?
          (
            <div>
              <Navigation
                projectId={this.props.data.projectId}
                numberOfVersions={this.props.data.numberOfVersions}
                pages={this.props.data.pages}
                backgrounds={this.props.data.backgrounds}
                screen={this.props.screen}
                urlParams={Utils.generateUrlParams(this.props.screen)}
                actions={this.navigationActions} />
              <Switch>
                <Redirect from="/" exact to={`/project/${this.state.projectId}`} />
                <Redirect from="/project" exact to={`/project/${this.state.projectId}`} />
                <Route path="/help" render={() => <div>Help</div>} />
                <Route path={`/project/${this.state.projectId}/:page?/:version?/:device?`} component={Screen} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          ) :
          <Login
            // projectId={this.projectId}
            projectId={this.state.projectId}
            error={this.props.data.error}
            getProjectData={this.props.actions.getProjectData}
          />
        }
      </Router>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
