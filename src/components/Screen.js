import React from 'react';
import cssmodules from 'react-css-modules';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import styles from './screen.cssmodule.scss';
import Frame from './Frame';

import {
  updateFrameDimensions,
  updateScreenDimensions,
  setCurrentDevice,
  setCurrentPageName,
  setCurrentDesignVersion,
  setSplitScreen,
  setDeviceMode,
  showDevice,
  setZoom,
  getImage,
  setLoadingImage,
  setBgColor,
  setBgImage,
  setImageDimensions,
  addComment,
  setAddingCommentMode,
  showCommentsList
} from '../actions/';

class Screen extends React.Component {

  constructor() {
    super();
    this.doUpdateFrame = undefined;
    this.doShowImage = undefined;
    this.initialDevice = undefined;
  }

  componentDidMount() {
    this.updateFrames();
    const splitScreenUrlParam = queryString.parse(this.props.location.search).splitScreen;
    const bgColorUrlParam = queryString.parse(this.props.location.search).bgColor || 'white';
    const bgImageUrlParam = queryString.parse(this.props.location.search).bgImage || undefined;
    this.props.actions.setSplitScreen(parseInt(splitScreenUrlParam, 10));
    this.props.actions.setBgColor(bgColorUrlParam);
    this.props.actions.setBgImage(bgImageUrlParam);
    if (!this.props.screen.currentPageName) {
      this.props.actions.setCurrentPageName(
        Object.keys(this.props.data.pages)[0]
      );
    } else {
      this.props.actions.setCurrentPageName(decodeURIComponent(this.props.match.params.page));
    }
    this.props.actions.setCurrentDesignVersion(this.props.match.params.version);
    window.addEventListener('resize', this.updateFrames.bind(this, false));
    this.initialDevice = this.props.match.params.device;

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      this.props.actions.setCurrentPageName(decodeURIComponent(nextProps.match.params.page));
    }
    if (this.props.match.params.version !== nextProps.match.params.version) {
      this.props.actions.setCurrentDesignVersion(nextProps.match.params.version);
      this.props.actions.setLoadingImage(false);
    }

    if (this.props.screen.splitScreen !== nextProps.screen.splitScreen) {
      this.updateFrames(true);
    }
    if (this.props.screen.currentPageName !== nextProps.screen.currentPageName) {
      const devices = document.getElementsByClassName('project-component');
      if (devices && devices.length > 0) {
        for (let i = 0; i <= devices.length - 1; i += 1) {
          devices[i].scrollTop = 0;
        }
      }
      // this.props.actions.setLoadingImage(true);
      this.updateFrames(true);
    }
    // Enable responsive mode
    if (this.props.screen.deviceMode && !nextProps.screen.deviceMode) {
      this.updateFrames();
    }
    if (this.props.screen.currentDevice !== nextProps.screen.currentDevice) {
      this.updateFrames(true);
    }
    if (this.props.screen.showDevice !== nextProps.screen.showDevice) {
      this.updateFrames(true);
    }
    if (this.props.screen.currentDesignVersion !== nextProps.screen.currentDesignVersion) {
      this.updateFrames(true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFrames.bind(this, false));
  }

  getPageDevices() {
    const pageName = this.props.screen.currentPageName;
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

  setScale() {
    const firstFrame = Object.keys(this.props.screen.frames)[0];
    const frameHeight = this.props.screen.frames[firstFrame].frameHeight;
    const frameWidth = this.props.screen.frames[firstFrame].frameWidth;
    const deviceHeight = (this.props.screen.currentDevice) ?
      this.props.data.devices[this.props.screen.currentDevice].cHeight : null;
    const deviceWidth = (this.props.screen.currentDevice) ?
      this.props.data.devices[this.props.screen.currentDevice].cWidth : null;
    const heightDiff = (frameHeight / (deviceHeight + 400));
    const widthDiff = (frameWidth / (deviceWidth + 200));
    let diff = 1;
    if (heightDiff < 1 || widthDiff < 1) {
      if (heightDiff < widthDiff) {
        diff = heightDiff;
      } else {
        diff = widthDiff;
      }
    }
    return diff;
  }

  getDevices() {
    const devicesList = Object.keys(this.props.data.devices);
    for (let i = 0; i < devicesList.length; i += 1) {
      const device = this.props.data.devices[devicesList[i]];
      const fileName = device.fileName;
      const imgFullPath = `${apiURL}getImage.php?image=${fileName}`;
      this.props.actions.getImage('fileName', imgFullPath, 'devicesList', devicesList[i]);
      this.props.actions.setImageDimensions(devicesList[i], device.dWidth, device.dHeight);
    }
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
      let filteredDevice;
      if (frameWidth < device.imageWidth && frameWidth >= device.breakpointWidth) {
        filteredDevice = device;
      }
      return filteredDevice;
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

  updateFrames(updateImage = false) {
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
          frameHeight
        );

        if (
          this.props.data.pages[this.props.screen.currentPageName]
            .devices[this.props.screen.currentDevice] &&
          this.props.data.pages[this.props.screen.currentPageName]
            .devices[this.props.screen.currentDevice].designs[version]
        ) {
          const imagePath = this.props.data.pages[this.props.screen.currentPageName]
            .devices[this.props.screen.currentDevice]
            .designs[version]
            .fileName;
          if (imagePath && updateImage) {
            const imgFullPath = `${apiURL}getImage.php?image=${this.props.data.projectId}/${imagePath}`;
            const pageName = this.props.screen.currentPageName;
            const device = this.props.screen.currentDevice;

            if (
              !this.props.images[pageName] ||
              !this.props.images[pageName][device] ||
              !this.props.images[pageName][device][version]
            ) {
              this.props.actions.getImage(version, imgFullPath, pageName, device);
            }
          }
        }
      }


      let currentDevice;
      if (this.props.screen.deviceMode) {
        currentDevice = this.props.screen.currentDevice || this.initialDevice;
      } else if (this.initialDevice) {
        currentDevice = this.initialDevice;
        this.props.actions.setDeviceMode(true);
        this.props.actions.showDevice(true);
      } else {
        currentDevice = this.matchDeviceToViewPortWidth();
      }

      if (currentDevice !== this.props.screen.currentDevice) {
        this.props.actions.setCurrentDevice(currentDevice);
      }
      this.initialDevice = undefined;

      if (!this.props.screen.deviceMode) {
        const imageWidth = this.props.data.pages[this.props.screen.currentPageName]
          .devices[this.props.screen.currentDevice]
          .designs[this.props.screen.currentDesignVersion]
          .iWidth;
        if (imageWidth < this.props.screen.frames.A.frameWidth) {
          this.props.actions.showDevice(true);
        } else {
          this.props.actions.showDevice(false);
          this.props.actions.setZoom(1, false);
        }
      }

      if (this.props.screen.showDevice && !this.props.screen.manualZoom) {
        this.props.actions.setZoom(this.setScale(), false);
      }

      if (!this.props.screen.deviceMode) {
        if (
          this.props.data.pages[this.props.screen.currentPageName]
            .devices[this.props.screen.currentDevice].bWidth > this.props.screen
            .frames[Object.keys(this.props.screen.frames)[0]]
            .frameWidth
        ) {
          this.props.actions.showDevice(true);
          this.props.actions.setZoom(this.setScale(), false);
        } else {
          this.props.actions.showDevice(false);
          this.props.actions.setZoom(1, false);
        }
      }

      if (!this.props.images.devicesList) {
        this.getDevices();
      }

    }, 250);
  }

  render() {
    return (
      <div className="screen-component" styleName="screen-component">
        { this.props.images.isLoadingImage > 0 ?
          <span styleName="screen-component__loadingSpinner" /> : null
        }

        <Frame
          id={this.props.screen.currentDesignVersion}
          screen={this.props.screen}
          project={this.props.data}
          images={this.props.images}
          actions={this.props.actions}
          messages={this.props.messages}
        />
        { this.props.screen.splitScreen > 0 ?
          <Frame
            id={'B'}
            screen={this.props.screen}
            project={this.props.data}
            images={this.props.images}
            actions={this.props.actions}
            messages={this.props.messages}
          /> : null }
        { this.props.screen.splitScreen > 1 ?
          <Frame
            id={'C'}
            screen={this.props.screen}
            project={this.props.data}
            images={this.props.images}
            actions={this.props.actions}
            messages={this.props.messages}
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
    data: state.data,
    images: state.images,
    messages: state.messages
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actions = {
    updateFrameDimensions,
    updateScreenDimensions,
    setCurrentDevice,
    setCurrentPageName,
    setCurrentDesignVersion,
    setSplitScreen,
    setDeviceMode,
    showDevice,
    setZoom,
    getImage,
    setLoadingImage,
    setBgColor,
    setBgImage,
    setImageDimensions,
    addComment,
    setAddingCommentMode,
    showCommentsList
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

Screen.defaultProps = {
  actions: {},
  data: {},
  screen: {},
  images: {},
  match: {},
  location: {}
};
Screen.propTypes = {
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
    showDesignImage: PropTypes.bool,
    frames: PropTypes.objectOf(
      PropTypes.shape({
        frameWidth: PropTypes.number,
        frameHeight: PropTypes.number
      })
    )
  }),
  images: PropTypes.shape({
    isLoadingImage: PropTypes.number,
    loadingImageError: PropTypes.bool,
    devicesList: PropTypes.shape({})
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      version: PropTypes.string,
      device: PropTypes.string,
      page: PropTypes.string
    })
  }),
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(cssmodules(Screen, styles));

