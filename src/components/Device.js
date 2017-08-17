import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './device.cssmodule.scss';
import Project from './Project';

class Device extends React.Component {

  calculateTransform() {
    const zoom = this.props.zoom;
    const top = 50;
    const left = 50;
    const translateX = -50 / zoom;
    const translateY = -50 / zoom;
    // TODO Show top and left area of zoomed-in devices
    return {
      transform: `scale(${zoom}) translate(${translateX}%, ${translateY}%)`,
      top: `${top}%`,
      left: `${left}%`,
    };
  }


  render() {
    let imagePath = undefined;
    let deviceBackgroundImage = undefined;
    let deviceImageWidth = undefined;
    let deviceImageHeight = undefined;

    if (!this.props.isLoadingImage) {
      if (
        this.props.screen.currentPageName &&
        this.props.screen.currentDevice &&
        this.props.frameId &&
        this.props.images[this.props.screen.currentPageName] &&
        this.props.images[this.props.screen.currentPageName][this.props.screen.currentDevice]
      ) {
        imagePath = this.props.images[this.props.screen.currentPageName][this.props.screen.currentDevice][this.props.frameId];
      }
    }
    if (this.props.images.devicesList && this.props.images.devicesList[this.props.currentDevice]) {
      deviceBackgroundImage = this.props.images.devicesList[this.props.currentDevice].fileName;
      deviceImageWidth = this.props.images.devicesList[this.props.currentDevice].dWidth;
      deviceImageHeight = this.props.images.devicesList[this.props.currentDevice].dHeight;
    }

    return (
      <div
        className="device-component"
        styleName="device-component"
        style={{
          height: this.props.clientHeight,
          width: this.props.clientWidth,
          ...this.calculateTransform()
        }}
      >
        {this.props.showDevice && this.props.currentDevice ?
          <div
            styleName="device-component__device"
            id={`device_${this.props.frameId}`}
            style={{
              backgroundImage: `url(${deviceBackgroundImage})`,
              height: deviceImageHeight,
              width: deviceImageWidth,
            }}
          /> : null
        }
        {imagePath ?
          <Project
            imagePath={imagePath}
            projectId={this.props.projectId}
            imageHeight={this.props.imageHeight}
            imageWidth={this.props.imageWidth}
            screen={this.props.screen}
            currentPage={this.props.currentPage}
          /> : null
        }
      </div>
    );
  }
}

Device.displayName = 'Device';
Device.propTypes = {};
Device.defaultProps = {};

export default cssmodules(Device, styles);
