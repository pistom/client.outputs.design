import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './frame.cssmodule.scss';

class Frame extends React.Component {

  componentDidMount() {
    console.log(this.props.project.pages[this.props.screen.currentPageName])
  }

  calculateFrameWidth() {
    const splitScreen = this.props.screen.splitScreen;
    let frameWidthPercentage = 100;
    if (this.props.screen.width >= this.props.screen.height) {
      frameWidthPercentage /= (splitScreen + 1);
    }
    return `${frameWidthPercentage}%`;
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
        .designs[this.props.screen.currentDesignVersion]
        .fileName;
    } else {
      fileName = 'Loading...';
    }
    return (
      <div
        id={`f_${this.props.id}`}
        className="frame-component"
        styleName="frame-component"
        style={{
          width: this.calculateFrameWidth(),
          height: this.props.screen.height,
          backgroundImage: `url(http://localhost/crayon/API/test/${fileName})`,
          backgroundPosition: 'top center'
        }}
      >
        <p>Frame {this.props.id}</p>

      </div>
    );
  }
}

Frame.displayName = 'Frame';
Frame.propTypes = {};
Frame.defaultProps = {};


export default cssmodules(Frame, styles);

