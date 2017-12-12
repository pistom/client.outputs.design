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
    this.addCommentFunc = this.addComment.bind(this);
  }

  handleClickComment(commentId) {
    this.setState({
      activeComment: commentId
    });
  }

  componentDidMount() {
    this.setVisibleAreaDimensions();
  }

  componentWillReceiveProps(nextProps) {
    const commentLayerDOM = document.getElementById('commentLayer');
    if (commentLayerDOM) {
      if (!this.props.addingCommentMode && nextProps.addingCommentMode) {
        commentLayerDOM.addEventListener('click', this.addCommentFunc, false);
      }
      if (this.props.addingCommentMode && !nextProps.addingCommentMode) {
        console.log('test');
        commentLayerDOM.removeEventListener('click', this.addCommentFunc, false);
      }
    }

  }

  addComment(e) {
    const d = new Date();
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const date = `0${d.getDate()}`.slice(-2);
    this.props.actions.setAddingCommentMode(false);
    const x = e.offsetX;
    const y = e.offsetY;
    const pageName = this.props.screen.currentPageName;
    const device = this.props.screen.currentDevice;
    const version = this.props.screen.currentDesignVersion;
    const comment = {
      pos: [x, y],
      date: `${d.getFullYear()}-${month}-${date}`,
      time: `${d.getHours()}:${d.getMinutes()}`,
      type: 'client',
      content: ''
    };
    this.props.actions.addComment(comment, pageName, device, version);
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
        id="commentLayer"
        styleName="commentslayer-component"
        style={{
          height: this.props.imageHeight,
          width: this.props.imageWidth,
          cursor: this.props.addingCommentMode ? 'crosshair' : 'default'
        }}
      >
        { this.props.comments ?
          Object.keys(this.props.comments).map((comment, iterator) => (
            <Comment
              key={iterator}
              id={comment}
              activeComment={this.state.activeComment}
              clickAction={this.handleClickComment}
              comment={this.props.comments[comment]}
              visibleArea={[this.state.visibleAreaWidth, this.state.visibleAreaHeight]}
              imageWidth={this.props.imageWidth}
              addingCommentMode={this.props.addingCommentMode}
            />
          )) : null
        }
      </div>
    );
  }
}

CommentsLayer.displayName = 'CommentsLayer';
CommentsLayer.propTypes = {};
CommentsLayer.defaultProps = {};

export default cssmodules(CommentsLayer, styles);
