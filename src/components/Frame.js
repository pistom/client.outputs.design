import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './frame.cssmodule.sass';


class Frame extends React.Component {


  render() {
    return (
      <div className="frame-component" styleName="frame-component">
        <p>Frame {this.props.id}</p>
        <p>{this.props.fileName}</p>
      </div>
    );
  }
}

Frame.displayName = 'Frame';
Frame.propTypes = {};
Frame.defaultProps = {};


export default cssmodules(Frame, styles);

