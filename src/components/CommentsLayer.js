import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './commentslayer.cssmodule.scss';
import Comment from './Comment';

class CommentsLayer extends React.Component {
  constructor() {
    super();
    this.state = {
      activeComment: 1,
      visibleAreaWidth: 0,
      visibleAreaHeight: 0
    };
    this.handleClickComment = this.handleClickComment.bind(this);
  }

  handleClickComment(commentId) {
    this.setState({
      activeComment: commentId
    });
  }

  componentDidMount() {
    this.setVisibleAreaDimensions();
  }

  setVisibleAreaDimensions() {
    if (
      document.getElementsByClassName('device-component')[0] &&
      document.getElementsByClassName('project-component')[0]
    ) {
      this.setState({
        visibleAreaWidth: document.getElementsByClassName('device-component')[0].offsetWidth,
        visibleAreaHeight: document.getElementsByClassName('project-component')[0].offsetHeight
      });
    }
  }

  render() {
    return (
      <div
        styleName="commentslayer-component"
        style={{
          height: this.props.imageHeight,
          width: this.props.imageWidth
        }}
      >
        { this.props.comments ?
          Object.keys(this.props.comments).map((comment, iterator) => {
            return (
              <Comment
                key={iterator}
                id={comment}
                activeComment={this.state.activeComment}
                clickAction={this.handleClickComment}
                comment={this.props.comments[comment]}
                visibleArea={[this.state.visibleAreaWidth, this.state.visibleAreaHeight]}
                imageWidth={this.props.imageWidth}
              />
            );
          }) : null
        }
      </div>
    );
  }
}

CommentsLayer.displayName = 'CommentsLayer';
CommentsLayer.propTypes = {};
CommentsLayer.defaultProps = {};

export default cssmodules(CommentsLayer, styles);
