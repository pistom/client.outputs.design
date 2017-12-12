import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './commentslist.cssmodule.scss';

class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hideWindow: false};
    this.closeCommentsList = this.handleCloseCommentsList.bind(this);
    this.changePage = this.handleChangePage.bind(this);
  }

  handleCloseCommentsList() {
    this.setState({
      hideWindow: true
    });
    setTimeout(() => {
      this.props.actions.showCommentsList(false);
    }, 200);
  }

  handleChangePage(page, device, version) {
    this.props.actions.setCurrentPageName(page);
    this.props.actions.setCurrentDevice(device);
    this.props.actions.setCurrentDesignVersion(version);
    this.closeCommentsList();
  }

  render() {
    return (
      <div styleName={`commentslist-component__wrapper${!this.state.hideWindow ? '' : ' hide'}`}>
        <div styleName="commentslist-component">
          <span
            styleName="commentslist-component__close"
            onClick={this.closeCommentsList}
          />
          <div styleName="commentslist-component__content">
            <h1 styleName="title">All comments</h1>
            <div styleName="comments">
              <div>
                <div styleName="commentslist-component__table">
                  { this.props.comments ?
                    Object.keys(this.props.comments).map((page) => {
                      return (
                        <div key={page}>
                          {Object.keys(this.props.comments[page]).map((device) => {
                            return (
                              <div key={device}>
                                {Object.keys(this.props.comments[page][device]).map((version) => {
                                  return (
                                    <div
                                      styleName="row"
                                      key={version}
                                      onClick={() => this.changePage(page, device, version)}
                                    >
                                      <span>{page}</span>
                                      <span>{device}</span>
                                      <span>{version}</span>
                                      <span>{Object.keys(this.props.comments[page][device][version]).length}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      );
                    }) : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentsList.displayName = 'CommentsList';
CommentsList.propTypes = {};
CommentsList.defaultProps = {};

export default cssmodules(CommentsList, styles, {allowMultiple: true});
