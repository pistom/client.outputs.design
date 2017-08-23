import React from 'react';
import PropTypes from 'prop-types';
import cssmodules from 'react-css-modules';
import styles from './frame.cssmodule.scss';
import Device from './Device';

class Frame extends React.Component {

  calculateFrameWidth() {
    const splitScreen = this.props.screen.splitScreen;
    let frameWidthPercentage = 100;
    if (this.props.screen.width >= this.props.screen.height) {
      frameWidthPercentage /= (splitScreen + 1);
    }
    return frameWidthPercentage;
  }

  calculateFrameHeight() {
    const splitScreen = this.props.screen.splitScreen;
    let frameHeight = this.props.screen.height;
    if (splitScreen > 0 && this.props.screen.width < this.props.screen.height) {
      frameHeight /= (splitScreen + 1);
    }
    return frameHeight;
  }

  render() {
    let imageHeight;
    let imageWidth;
    try {
      if (
        this.props.project.pages[this.props.screen.currentPageName] &&
        this.props.project.pages[this.props.screen.currentPageName]
          .devices[this.props.screen.currentDevice]
      ) {
        const project = this.props.project.pages[this.props.screen.currentPageName]
          .devices[this.props.screen.currentDevice]
          .designs[this.props.id];
        imageHeight = project.iHeight;
        imageWidth = project.iWidth;
      } else {
        imageHeight = null;
        imageWidth = null;
      }
    } catch (Err) {
      console.log(Err);
    }
    // const filePath = (fileName) ? `url(http://localhost/crayon/API/test/${fileName})` : null;
    // const filePath = (fileName) ? `http://api.outputs.cinquiemecrayon.eu/${this.props.project.projectId}/${fileName}` : null;
    // if (filePath) {
    //   this.props.actions.getImage(filePath);
    // }

    let clientWidth;
    let clientHeight;
    if (this.props.screen.showDevice) {
      try {
        if (
          this.props.project.devices[this.props.screen.currentDevice]
        ) {
          clientWidth = this.props.project.devices[this.props.screen.currentDevice].cWidth;
          clientHeight = this.props.project.devices[this.props.screen.currentDevice].cHeight;
        }
      } catch (Err) {
        clientWidth = undefined;
        clientHeight = undefined;
      }
    } else {
      clientWidth = '100%';
      clientHeight = '100%';
    }

    // TODO Change gap generating
    let horizontalSplitGap = false;
    let verticalSplitGap = false;
    if (this.calculateFrameWidth() !== 100 && this.props.id !== 'A') {
      horizontalSplitGap = true;
    }

    if (this.calculateFrameHeight() !== this.props.screen.height && this.props.id !== 'A') {
      verticalSplitGap = true;
    }

    const versionIndicatorStyles = {
      display: 'none'
    };
    if (this.props.project.numberOfVersions > 1) {
      versionIndicatorStyles.display = 'block';
    }

    let currentPage;
    if (
      this.props.project.pages &&
      this.props.project.pages[this.props.screen.currentPageName] &&
      this.props.project.pages[this.props.screen.currentPageName]
        .devices[this.props.screen.currentDevice]
    ) {
      currentPage = this.props.project.pages[this.props.screen.currentPageName]
        .devices[this.props.screen.currentDevice].designs[this.props.id];
    }

    let backgroundImageStyles = {
      backgroundImage: 'none'
    };
    if (this.props.screen.bgImage && this.props.project) {
      backgroundImageStyles = {
        backgroundImage: `url('${apiURL}getImage.php?image=${this.props.project.backgrounds[this.props.screen.bgImage].fileName}')`,
        backgroundSize: this.props.project.backgrounds[this.props.screen.bgImage].bgSize,
        backgroundPosition: this.props.project.backgrounds[this.props.screen.bgImage].bgPosition
      };
    }
    let comments = {};
    if (
      this.props.screen.currentPageName &&
      this.props.comments &&
      this.props.screen.currentDevice
    ) {
      const currentPageName = this.props.screen.currentPageName;
      const currentDevice = this.props.screen.currentDevice;
      try {
        comments = this.props.comments[currentPageName][currentDevice][this.props.id];
      } catch(Err) {
        comments = {};
      }

    }

    return (
      <div
        id={`f_${this.props.id}`}
        className="frame-component"
        styleName="frame-component"
        style={{
          width: `${this.calculateFrameWidth()}%`,
          height: `${this.calculateFrameHeight()}px`,
          borderLeft: horizontalSplitGap ? '5px solid gray' : null,
          borderTop: verticalSplitGap ? '5px solid gray' : null,
          backgroundColor: `${this.props.screen.showDevice ? this.props.screen.bgColor : 'white'}`,
          ...backgroundImageStyles
        }}
      >
        <div
          styleName="frame-component__versionIndicator"
          style={versionIndicatorStyles}
        >
          <div>version</div>
          {this.props.id}
        </div>

        <Device
          projectId={this.props.project.projectId}
          frameId={this.props.id}
          images={this.props.images}
          screen={this.props.screen}
          currentPage={currentPage}
          clientWidth={clientWidth}
          clientHeight={clientHeight}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          screenWidth={this.calculateFrameWidth()}
          screenHeight={this.calculateFrameHeight()}
          showDevice={this.props.screen.showDevice}
          currentDevice={this.props.screen.currentDevice}
          zoom={this.props.screen.zoom}
          isLoading={this.props.images.isLoadingImage}
          comments={comments}
        />
      </div>
    );
  }
}

Frame.displayName = 'Frame';
Frame.propTypes = {
  project: PropTypes.shape({
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
  id: PropTypes.string
};
Frame.defaultProps = {
  screen: {},
  project: {},
  images: {},
  id: 'A'
};


export default cssmodules(Frame, styles);

