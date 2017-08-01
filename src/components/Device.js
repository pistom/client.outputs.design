import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './device.cssmodule.scss';

class Device extends React.Component {

  render() {
    return (
      <div
        className="device-component"
        styleName="device-component"
        style={{
          backgroundImage: this.props.filePath,
          height: '100%',
          backgroundPosition: 'top center'
        }}
      >
      </div>
    );
  }
}

Device.displayName = 'Device';
Device.propTypes = {};
Device.defaultProps = {};

export default cssmodules(Device, styles);
