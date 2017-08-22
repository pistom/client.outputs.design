import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './messageswindow.cssmodule.scss';

class MessagesWindow extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.state = {message: ''};
  }

  componentWillMount() {
    this.setState({
      message: ''
    });
  }

  handleChangeMessage(event) {
    this.setState({message: event.target.value});
  }

  render() {
    return (
      <div styleName="messageswindow-component__wrapper">
        <div styleName="messageswindow-component">
          <span
            styleName="messageswindow-component__close"
            onClick={() => this.props.actions.showMessagesWindow(false)}
          />
          <div styleName="messageswindow-component__content">
            <h1 styleName="title">Messages</h1>
            <div styleName={this.props.designIsAccepted ? 'messages accepted' : 'messages'}>
              {this.props.messages.map((message, index) => {
                return (
                  <div key={index} styleName={`message ${message.type}`}>
                    <span styleName="typeMessageIcon" />
                    <div styleName="date">
                      {message.date} | {message.time}
                    </div>
                    <div styleName="content">
                      {message.type === 'accept' ?
                        <div styleName="info">
                          Acceptance of the design by the client
                        </div> : null
                      }
                      {message.content}
                    </div>
                  </div>
                );
              })}
            </div>
            <div styleName={this.props.designIsAccepted ? 'form accepted' : 'form'}>
              {!this.props.designIsAccepted ?
                <form action="">
                  <textarea name="message" placeholder="Message" onChange={this.handleChangeMessage} />
                  <div styleName="form__btns">
                    <input styleName="form__btn" type="submit" value="Submit message" /><br/>
                    <input styleName="form__btn success" type="submit" value={ this.state.message ? 'Accept project with message' : 'Accept project'} />
                  </div>
                </form> :
                <p styleName="form__message">Design is accepted</p>
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

MessagesWindow.displayName = 'MessagesWindow';
MessagesWindow.propTypes = {};
MessagesWindow.defaultProps = {};

export default cssmodules(MessagesWindow, styles, {allowMultiple: true});
