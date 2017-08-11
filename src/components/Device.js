import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './device.cssmodule.scss';
import Project from './Project';

class Device extends React.Component {
  constructor(){
    super();
    this.devices = {
      // Small: {iWidth: 800, iHeight: 1000, fileName: 'http://localhost/crayon/_images/smartphone.png'},
      // Medium: {iWidth: 1100, iHeight: 1400, fileName: 'http://localhost/crayon/_images/tablet.png'},
      // Large: {iWidth: 1600, iHeight: 1200, fileName: 'http://localhost/crayon/_images/desktop.png'}
      Small: {iWidth: 800, iHeight: 1000, fileName: 'http://api.outputs.cinquiemecrayon.eu/devices/smartphone.png'},
      Medium: {iWidth: 1100, iHeight: 1400, fileName: 'http://api.outputs.cinquiemecrayon.eu/devices/tablet.png'},
      Large: {iWidth: 1600, iHeight: 1200, fileName: 'http://api.outputs.cinquiemecrayon.eu/devices/desktop.png'}
    };
  }

  calculateTransform() {
    const zoom = this.props.zoom;
    const top =  50;
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
    const imagePath = (this.props.images && this.props.images[this.props.frameId]) ?
      this.props.images[this.props.frameId].objectURL : null;
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
              backgroundImage: `url(${this.devices[this.props.currentDevice].fileName})`,
              height: this.devices[this.props.currentDevice].iHeight,
              width: this.devices[this.props.currentDevice].iWidth
            }}
          /> : null
        }
        {imagePath ?
          <Project
            imagePath={imagePath}
            imageHeight={this.props.imageHeight}
            imageWidth={this.props.imageWidth}
          /> :
          <div>No file found</div>
        }
      </div>
    );
  }
}

Device.displayName = 'Device';
Device.propTypes = {};
Device.defaultProps = {};

export default cssmodules(Device, styles);
