/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import {
  connect,
  Provider
} from 'react-redux';
import {
  updateFrameDimensions,
  setCurrentDevice,
  setSplitScreen,
  updateScreenDimensions,
  setCurrentPageName,
  setCurrentDesignVersion,
  setDeviceMode,
  showDevice,
  setZoom,
  getImage,
  getProjectData,
  setLoadingImage,
  setBgColor,
  setBgImage,
  setImageDimensions,
  showMessagesWindow,
  getMessages,
  showComments,
  setAddingCommentMode,
  addComment,
  showCommentsList
} from '../actions/';
import Main from '../components/App';
/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    const {actions, screen, data, routing, images, messages} = this.props;
    return (
      <Main
        actions={actions}
        screen={screen}
        data={data}
        routing={routing}
        images={images}
        messages={messages}/>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
  actions: PropTypes.shape({
    updateFrameDimensions: PropTypes.func.isRequired,
    setCurrentDevice: PropTypes.func.isRequired,
    setSplitScreen: PropTypes.func.isRequired,
    updateScreenDimensions: PropTypes.func.isRequired,
    setCurrentPageName: PropTypes.func.isRequired,
    setCurrentDesignVersion: PropTypes.func.isRequired,
    setDeviceMode: PropTypes.func.isRequired,
    showDevice: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired,
    getImage: PropTypes.func.isRequired,
    getProjectData: PropTypes.func.isRequired,
    setLoadingImage: PropTypes.func.isRequired,
    setBgColor: PropTypes.func.isRequired,
    setBgImage: PropTypes.func.isRequired,
    setImageDimensions: PropTypes.func.isRequired,
    showMessagesWindow: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    showComments: PropTypes.func.isRequired,
    setAddingCommentMode: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    showCommentsList: PropTypes.func.isRequired
  }),
  screen: PropTypes.shape({}),
  data: PropTypes.shape({}),
  routing: PropTypes.shape({}),
  images: PropTypes.shape({}),
  messages: PropTypes.shape({})
};
function mapStateToProps(state) {
  // eslint-disable-line no-unused-vars
  /* Populated by react-webpack-redux:reducer */
  const props = {
    screen: state.screen,
    data: state.data,
    routing: state.routing,
    images: state.images,
    messages: state.messages
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {
    updateFrameDimensions,
    setCurrentDevice,
    setSplitScreen,
    updateScreenDimensions,
    setCurrentPageName,
    setCurrentDesignVersion,
    setDeviceMode,
    showDevice,
    setZoom,
    getImage,
    getProjectData,
    setLoadingImage,
    setBgColor,
    setBgImage,
    setImageDimensions,
    showMessagesWindow,
    getMessages,
    showComments,
    setAddingCommentMode,
    addComment,
    showCommentsList
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
