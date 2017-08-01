import React from 'react';
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
    return `${frameWidthPercentage}%`;
  }

  calculateFrameHeight() {
    const splitScreen = this.props.screen.splitScreen;
    let frameHeight = this.props.screen.height;
    if (splitScreen > 0 && this.props.screen.width < this.props.screen.height) {
      frameHeight /= (splitScreen + 1);
    }
    return `${frameHeight}px`;
  }


  render() {
    let fileName;
    if (
      this.props.project.pages[this.props.screen.currentPageName] &&
      this.props.project.pages[this.props.screen.currentPageName]
        .devices[this.props.screen.currentDevice]
    ) {
      fileName = this.props.project.pages[this.props.screen.currentPageName]
        .devices[this.props.screen.currentDevice]
        .designs[this.props.id]
        .fileName;
    } else {
      fileName = 'Loading...';
    }

    const filePath = `url(http://localhost/crayon/API/test/${fileName})`;

    return (
      <div
        id={`f_${this.props.id}`}
        className="frame-component"
        styleName="frame-component"
        style={{
          width: this.calculateFrameWidth(),
          height: this.calculateFrameHeight(),
        }}
      >
        <Device filePath={filePath} />
      </div>
    );
  }
}

Frame.displayName = 'Frame';
Frame.propTypes = {};
Frame.defaultProps = {};


export default cssmodules(Frame, styles);

