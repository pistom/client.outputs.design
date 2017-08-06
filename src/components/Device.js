import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './device.cssmodule.scss';
import Project from './Project';

class Device extends React.Component {

  render() {
    const border = (this.props.showDevice) ? 1 : 0;
    return (
      <div
        className="device-component"
        styleName="device-component"
        style={{
          height: this.props.clientHeight,
          width: this.props.clientWidth,
          border: `${border}px solid #000`
        }}
      >
        {this.props.filePath ?
          <Project
            filePath={this.props.filePath}
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
