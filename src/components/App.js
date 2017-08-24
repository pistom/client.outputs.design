/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import history from '../history';
import './app.css';
import Screen from './Screen';
import Navigation from './Navigation';
import PageNotFound from './404';
import Login from './Login';
import Messages from './MessagesWindow';

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
      setBgImage: this._handleSetBgImage.bind(this),
      showMessagesWindow: this._handleShowMessages.bind(this),
      showComments: this._handleShowComments.bind(this)
    };
    const projectId = window.location.pathname.split('/')[2];
    this.state = {projectId};
  }

  componentDidMount() {
    if (this.state.projectId) {
      this.props.actions.getProjectData(this.state.projectId);
      this.props.actions.getMessages(this.state.projectId);
      let currentPageName = window.location.pathname.split('/')[3] || null;
      currentPageName = currentPageName ? decodeURIComponent(currentPageName) : undefined;
      this.props.actions.setCurrentPageName(currentPageName);
    }
    this.state.zoom = 1;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.projectId !== nextProps.data.projectId) {
      this.setState({
        projectId: nextProps.data.projectId
      });
    }
    if (this.props.screen.zoom !== nextProps.screen.zoom) {
      this.setState({
        zoom: nextProps.screen.zoom
      });
    }
    if (this.props.messages.areLoadingMessages && !nextProps.messages.areLoadingMessages) {
      if (nextProps.messages.messages.length > 0) {
        this.props.actions.showMessagesWindow(true);
      }
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
    this.props.actions.setBgColor(undefined);
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleChangeDesignVersion(design) {
    this.props.actions.setCurrentDesignVersion(design);
    // TODO Change mode of dispatch history.push action
    setTimeout(() => {
      history.push(`${this.generateUrl()}`);
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
      this.props.actions.setBgImage(undefined);
      this.props.actions.setBgColor('ffffff');
    }
    // TODO Change mode of dispatch history.push action
    setTimeout(() => history.push(`${this.generateUrl()}`), 100);
  }

  _handleSetZoom(zoomming) {
    let newZoom;
    switch (zoomming) {
      case '+': {
        newZoom = this.state.zoom + (this.state.zoom / 2);
        break;
      }
      case '-': {
        newZoom = this.state.zoom - (this.state.zoom / 3);
        break;
      }
      default: {
        newZoom = 1;
      }
    }
    this.setState({zoom: newZoom});
    this.props.actions.setZoom(newZoom);
  }

  _handleShowMessages(show) {
    this.props.actions.showMessagesWindow(show);
  }

  _handleShowComments(show) {
    this.props.actions.showComments(show);
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
                actions={this.navigationActions}
                showComments={this.props.screen.showComments}
              />
              <Switch>
                <Redirect from="/" exact to={`/project/${this.state.projectId}`} />
                <Redirect from="/project" exact to={`/project/${this.state.projectId}`} />
                <Route path="/help" render={() => <div>Help</div>} />
                <Route path={`/project/${this.state.projectId}/:page?/:version?/:device?`} component={Screen} />
                <Route component={PageNotFound} />
              </Switch>
              { this.props.screen.showMessagesWindow ?
                <Messages
                  actions={this.props.actions}
                  messages={this.props.messages.messages}
                  designIsAccepted={this.props.messages.designIsAccepted}
                /> : null
              }
            </div>
          ) : (
            <Login
              projectId={this.state.projectId}
              error={this.props.data.error}
              getProjectData={this.props.actions.getProjectData}
              getMessages={this.props.actions.getMessages}
            />
          )
        }
      </Router>
    );
  }
}

AppComponent.defaultProps = {
  actions: {},
  data: {},
  screen: {}
};
AppComponent.propTypes = {
  actions: PropTypes.objectOf(
    PropTypes.func
  ),
  data: PropTypes.shape({
    isLoadingData: PropTypes.bool,
    loadingDataError: PropTypes.bool,
    dataReady: PropTypes.bool,
    projectId: PropTypes.string,
    name: PropTypes.string,
    numberOfVersions: PropTypes.number,
    password: PropTypes.string,
    error: PropTypes.string,
    backgrounds: PropTypes.objectOf(
      PropTypes.shape({
        fileName: PropTypes.string,
        bgSize: PropTypes.string,
        bgPosition: PropTypes.string
      })
    ),
    pages: PropTypes.objectOf(
      PropTypes.shape()
    ),
    devices: PropTypes.objectOf(
      PropTypes.shape()
    )
  }),
  screen: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    currentDevice: PropTypes.string,
    currentPageName: PropTypes.string,
    currentDesignVersion: PropTypes.string,
    splitScreen: PropTypes.number,
    deviceMode: PropTypes.bool,
    showDevice: PropTypes.bool,
    zoom: PropTypes.number,
    manualZoom: PropTypes.bool,
    bgColor: PropTypes.string,
    bgImage: PropTypes.string,
    showDesignImage: PropTypes.bool
  })
};

export default AppComponent;
