import React from 'react';
import cssmodules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styles from './screen.cssmodule.sass';
import Frame from './Frame';

import {
  updateFrameDimensions,
  updateScreenDimensions,
  setCurrentDevice,
  setCurrentPageName,
  setCurrentDesignVersion,
  setSplitScreen
} from '../actions/';

class Screen extends React.Component {

  constructor() {
    super();
    this.doUpdateFrame = undefined;
  }

  componentDidMount() {
    this.updateFrames();
    const splitScreenUrlParam = queryString.parse(this.props.location.search).splitScreen;
    this.props.actions.setSplitScreen(parseInt(splitScreenUrlParam, 10));
    this.props.actions.setCurrentPageName(this.props.match.params.page);
    this.props.actions.setCurrentDesignVersion(this.props.match.params.version);
    window.addEventListener('resize', this.updateFrames.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      this.props.actions.setCurrentPageName(nextProps.match.params.page);
    }
    if (this.props.match.params.version !== nextProps.match.params.version) {
      this.props.actions.setCurrentDesignVersion(nextProps.match.params.version);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFrames.bind(this));
  }

  getPageDevices() {
    const pageName = this.props.match.params.page;
    const pageDevices = this.props.data.pages[pageName].devices;
    let pageDevicesList = [];
    try {
      pageDevicesList = Object.keys(pageDevices).map((key) => {
        const device = {
          deviceName: key,
          imageWidth: pageDevices[key].iWidth,
          breakpointWidth: pageDevices[key].bWidth
        };
        return device;
      });
    } catch (err) {
      console.log(err);
    }
    pageDevicesList.sort((a, b) => (a.breakpointWidth - b.breakpointWidth));
    return pageDevicesList;
  }

  matchDeviceToViewPortWidth() {
    const pageDevicesList = this.getPageDevices();
    if (pageDevicesList.length === 0) {
      pageDevicesList.push({deviceName: null});
    }
    const frameWidth = this.props.screen.frames[this.props.screen.currentDesignVersion].frameWidth;

    /*
     * Filter all devices who have image width > window width and
     * breakpoint width <= window width
     */
    const matchedResults = pageDevicesList.filter((device) => {
      if (frameWidth < device.imageWidth && frameWidth >= device.breakpointWidth) {
        return device;
      }
    });
    let bestResult = pageDevicesList[0];
    if (matchedResults.length !== 0) {
      bestResult = matchedResults.pop();
    } else {
      for (let i = pageDevicesList.length - 1; i >= 0; i -= 1) {
        if (pageDevicesList[i].breakpointWidth <= frameWidth) {
          bestResult = pageDevicesList[i];
          break;
        }
      }
    }
    return bestResult.deviceName;
  }

  updateFrames() {
    clearTimeout(this.doUpdateFrame);
    this.doUpdateFrame = setTimeout(() => {
      this.props.actions.updateScreenDimensions(window.innerWidth, window.innerHeight);
      let frameWidth;
      let frameHeight;
      for (let i = 0; i <= this.props.screen.splitScreen; i += 1) {
        let version;
        if (this.props.screen.splitScreen === 0) {
          version = this.props.screen.currentDesignVersion;
        } else {
          version = String.fromCharCode(65 + i);
        }
        const frame = document.getElementById(`f_${version}`);
        frameWidth = frame.offsetWidth;
        frameHeight = frame.offsetHeight;
        this.props.actions.updateFrameDimensions(
          version,
          frameWidth,
          frameHeight);
      }
      let currentDevice = (this.props.match.params.device) ?
        this.props.match.params.device : this.matchDeviceToViewPortWidth();
      this.props.actions.setCurrentDevice(currentDevice);
    }, 300);
  }

  render() {
    return (
      <div className="screen-component" styleName="screen-component">
        <Frame
          id={this.props.screen.currentDesignVersion}
          screen={this.props.screen}
          project={this.props.data}
        />
        { this.props.screen.splitScreen > 0 ?
          <Frame
            id={'B'}
            screen={this.props.screen}
            project={this.props.data}
          /> : null }
      </div>
    );
  }
}

Screen.displayName = 'Screen';
Screen.propTypes = {};
Screen.defaultProps = {};

function mapStateToProps(state) {
  const props = {
    screen: state.screen,
    data: state.data
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    updateFrameDimensions,
    updateScreenDimensions,
    setCurrentDevice,
    setCurrentPageName,
    setCurrentDesignVersion,
    setSplitScreen
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(cssmodules(Screen, styles));

