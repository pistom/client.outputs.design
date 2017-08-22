import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './login.cssmodule.scss';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {projectId: '', password: ''};
    this.handleChangeProjectId = this.handleChangeProjectId.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      projectId: '',
      password: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({projectId: nextProps.projectId});
  }

  handleChangeProjectId(event) {
    this.setState({projectId: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getProjectData(this.state.projectId, this.state.password);
    this.props.getMessages(this.state.projectId, this.state.password);
  }

  render() {
    return (
      <div className="login-component" styleName="login-component">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.projectId} placeholder="Projec ID" onChange={this.handleChangeProjectId}/>
          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handleChangePassword}/>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.props.error}</p>
      </div>
    );
  }
}

Login.displayName = 'Login';
Login.propTypes = {};
Login.defaultProps = {};

export default cssmodules(Login, styles);
