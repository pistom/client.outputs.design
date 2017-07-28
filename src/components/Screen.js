import React from 'react';
import cssmodules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './screen.cssmodule.sass';
import Frame from './Frame';

import {
  updateFrameDimensions,
  setCurrentDevice
} from '../actions/';

class Screen extends React.Component {

  constructor() {
    super();
    this.doUpdateFrame = undefined;
  }

  componentDidMount() {
    this.updateFrame();
    window.addEventListener('resize', this.updateFrame.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFrame.bind(this));
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
    const windowWidth = this.props.screen.frameWidth;

    /*
     * Filter all devices who have image width > window width and
     * breakpoint width <= window width
     */
    const matchedResults = pageDevicesList.filter((device) => {
      if (windowWidth < device.imageWidth && windowWidth >= device.breakpointWidth) {
        return device;
      }
    });
    let bestResult = pageDevicesList[0];
    if (matchedResults.length !== 0) {
      bestResult = matchedResults.pop();
    } else {
      for (let i = pageDevicesList.length - 1; i >= 0; i -= 1) {
        if (pageDevicesList[i].breakpointWidth <= windowWidth) {
          bestResult = pageDevicesList[i];
          break;
        }
      }
    }
    return bestResult.deviceName;
  }

  updateFrame() {
    clearTimeout(this.doUpdateFrame);
    this.doUpdateFrame = setTimeout(() => {
      const frameWidth = window.innerWidth;
      const frameHeight = window.innerHeight;
      const frameId = 1;
      this.props.actions.updateFrameDimensions(frameId, frameWidth, frameHeight);
      this.props.actions.setCurrentDevice(this.matchDeviceToViewPortWidth());
    }, 300);
  }

  render() {

    return (
      <div className="screen-component" styleName="screen-component">
        <Frame id={0} fileName="test1" />
        <Frame id={1} fileName="test2" />
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
    setCurrentDevice
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(cssmodules(Screen, styles));

