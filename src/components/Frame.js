import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './frame.cssmodule.scss';
import Device from './Device';

class Frame extends React.Component {

  calculateFrameWidth() {
    const splitScreen = this.props.screen.splitScreen;
    let frameWidthPercentage = 100;
    if (this.props.screen.width >= this.props.screen.height) {
      frameWidthPercentage = (frameWidthPercentage / (splitScreen + 1));
    }
    return `${frameWidthPercentage}%`;
  }

  calculateFrameHeight() {
    const splitScreen = this.props.screen.splitScreen;
    let frameHeight = this.props.screen.height;
    if (splitScreen > 0 && this.props.screen.width < this.props.screen.height) {
      frameHeight = (frameHeight / (splitScreen + 1)) - 10;
    }
    return `${frameHeight}px`;
  }


  render() {
    let fileName;
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
        fileName = project.fileName;
        imageHeight = project.iHeight;
        imageWidth = project.iWidth;
      } else {
        fileName = null;
        imageHeight = null;
        imageWidth = null;
      }
    } catch (Err) {
      fileName = null;
    }

    const filePath = (fileName) ? `url(http://localhost/crayon/API/test/${fileName})` : null;

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
    let splitGap = false;
    if (this.calculateFrameWidth() !== '100%' && this.props.id === 'A') {
      splitGap = true;
    }

    return (
      <div
        id={`f_${this.props.id}`}
        className="frame-component"
        styleName="frame-component"
        style={{
          width: this.calculateFrameWidth(),
          height: this.calculateFrameHeight(),
          borderRight: splitGap ? '2px solid #000' : null
        }}
      >
        <Device
          filePath={filePath}
          clientWidth={clientWidth}
          clientHeight={clientHeight}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          showDevice={this.props.screen.showDevice}
        />
      </div>
    );
  }
}

Frame.displayName = 'Frame';
Frame.propTypes = {};
Frame.defaultProps = {};


export default cssmodules(Frame, styles);

