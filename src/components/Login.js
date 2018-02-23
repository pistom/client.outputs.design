import React from 'react';
import cssmodules from 'react-css-modules';
import styles from './login.cssmodule.scss';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {projectId: '', password: '', error: ''};
    this.handleChangeProjectId = this.handleChangeProjectId.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      projectId: '',
      password: '',
      error: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.error
    });
    if (nextProps.projectId) {
      this.setState({
        projectId: nextProps.projectId,
      });
    }
  }

  handleChangeProjectId(event) {
    this.setState({projectId: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({
      password: event.target.value,
      error: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      error: ''
    });

    this.props.getProjectData(this.state.projectId, this.state.password, this.props.apiURL);
    this.props.getMessages(this.state.projectId, this.state.password, this.props.apiURL);
  }

  render() {
    return (
      <div className="login-component" styleName="login-component">
        <h1>designOutputs</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="projectId">Project ID</label>
          <input type="text" id="projectId" value={this.state.projectId} onChange={this.handleChangeProjectId} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={this.state.password} onChange={this.handleChangePassword} />
          <p styleName="submit"><input type="submit" value="Login" /></p>
        </form>
        <p styleName="info">{this.state.error}</p>
      </div>
    );
  }
}

Login.displayName = 'Login';
Login.propTypes = {};
Login.defaultProps = {};

export default cssmodules(Login, styles);
