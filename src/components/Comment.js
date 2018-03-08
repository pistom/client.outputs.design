import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './comment.cssmodule.scss';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editMode: false, commentContent: '', zIndex: 0 };
    this.setEditMode = this.setEditMode.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.onChangeCommentContent = this.onChangeCommentContent.bind(this);
  }

  componentWillMount() {
    this.setState({
      commentContent: this.props.comment.content
    });
  }

  componentDidMount() {
    if (this.state.commentContent === '') {
      this.setEditMode();
      this.state.zIndex = 1;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeComment !== nextProps.activeComment) {
      this.state.zIndex = nextProps.id === nextProps.activeComment ? 1 : 0;
    }
  }

  onChangeCommentContent(e) {
    this.setState({
      commentContent: e.target.value
    });
  }

  setEditMode() {
    this.setState({
      editMode: true
    });
  }

  deleteComment() {
    let confirmDelete = confirm('Are you sure?');
    if (confirmDelete) {
      alert(`Deleted ${this.props.id}`);
    }
  }

  saveComment(e) {
    e.preventDefault();
    this.setState({
      editMode: false
    });
  }

  checkIfCommentIsOutOfVisibleArea() {
    let commentIsOutOfVisibleAreaRight;
    let commentIsOutOfVisibleAreaBottom = false;
    const hiddenLeftAreaWidth = (this.props.imageWidth - this.props.visibleArea[0]) / 2;
    if (this.props.comment.pos[0] + 260  > this.props.visibleArea[0] + hiddenLeftAreaWidth) {
      commentIsOutOfVisibleAreaRight = true;
    } else {
      commentIsOutOfVisibleAreaRight = false;
    }
    return {right: commentIsOutOfVisibleAreaRight, bottom: commentIsOutOfVisibleAreaBottom};
  }

  generateCommentContentPosition() {
    let style = {};
    const commentIsOut = this.checkIfCommentIsOutOfVisibleArea();
    if (commentIsOut.right && !commentIsOut.bottom) {
      style = {
        left: 'auto',
        right: -6
      };
    }
    return style;
  }

  render() {
    this.checkIfCommentIsOutOfVisibleArea();
    return (
      <div
        onClick={() => this.props.clickAction(this.props.id)}
        styleName={this.props.addingCommentMode ? 'comment-component hide' : 'comment-component'}
        style={{
          left: this.props.comment.pos[0] - 12,
          top: this.props.comment.pos[1] - 12,
          zIndex: this.state.zIndex
        }}
      >
        <span styleName="number">{this.props.id}</span>
        <div
          styleName="commentBox"
          style={{
            ...this.generateCommentContentPosition()
          }}
        >
          <div styleName="datetime">{this.props.comment.date} | {this.props.comment.time}</div>
          { this.state.editMode ?
            <div styleName="form">
              <form action="" onSubmit={this.saveComment}>
                <textarea
                  autoFocus
                  value={this.state.commentContent}
                  onChange={this.onChangeCommentContent}
                />
                <div styleName="form__btns">
                  <input styleName="form__btn red" type="button" onClick={this.deleteComment} value="Delete" />
                  <input styleName="form__btn green" type="submit" value="Save" />
                </div>
              </form>
            </div> :
            <div styleName="form">
              <div styleName="comment">{this.state.commentContent}</div>
              <div styleName="form__btns">
                <input styleName="form__btn" type="button" onClick={this.setEditMode} value="Edit" />
              </div>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default cssmodules(Comment, styles, {allowMultiple: true});
