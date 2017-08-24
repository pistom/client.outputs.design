import React from 'react';
import {NavLink} from 'react-router-dom';
import cssmodules from 'react-css-modules';
import styles from './navigation.cssmodule.scss';

const Navigation = (props) => {

  return (
    <div>
      { !props.showComments ?
        <div styleName="navigation-component" className="navigation-component">
          <div styleName="navigation-component__btnMenuWrapper">
            <span styleName="navigation-component__btn navigation-component__btnMenu" />
          </div>

          <ul styleName="navigation-component__list">
            <li styleName="navigation-component__listElem hasSubList">
              <span styleName="navigation-component__btn navigation-component__btnFeedback" />
              <ul styleName="navigation-component__subList">
                <li>
                  <span
                    styleName="navigation-component__btn navigation-component__btnMessages"
                    onClick={() => props.actions.showMessagesWindow(true)}
                  />
                </li>
                <li>
                  <span
                    styleName="navigation-component__btn navigation-component__btnComments"
                    onClick={() => props.actions.showComments(true)}
                  />
                </li>
              </ul>
            </li>

            <li styleName="navigation-component__listElem">
              <span styleName="navigation-component__btn navigation-component__btnSettings hasSubmenu"></span>
              <div styleName="navigation-component__submenu">
                <h2>Options</h2>
                <div styleName="navigation-component__options">
                  <div styleName="option">
                    <div styleName="label">
                      Device:
                    </div>
                    <div styleName="list">
                      <ul>
                        {props.screen.currentPageName ?
                          Object.keys(props.pages[props.screen.currentPageName].devices)
                            .map((device => {
                              return (
                                <li key={device}>
                                  <span
                                    onClick={() => props.actions.changeDevice(device)}
                                    styleName={props.screen.currentDevice === device &&
                                      props.screen.deviceMode ? 'active' : null}
                                  >
                                    {device}
                                  </span>
                                </li>);
                            })) : null
                        }
                      </ul>
                    </div>
                  </div>

                  {props.numberOfVersions > 1 ?
                    (
                      <div styleName="option">
                        <div styleName="label">
                          Split screen:
                        </div>
                        <div styleName="list">
                          <div styleName="splitScreen">
                            {props.screen.splitScreen === 0 ?
                              <span onClick={() => props.actions.splitScreen(1)}>off</span> :
                              <span
                                styleName="on"
                                onClick={() => props.actions.splitScreen(0)}>on</span>
                            }
                          </div>
                        </div>
                      </div>
                    ) : null}

                  {props.screen.deviceMode ?
                    <div styleName="option">
                      <div styleName="label">
                        Background:
                      </div>
                      <div styleName="list">
                        <div styleName="colors">
                          <span
                            onClick={() => props.actions.setBgColor('#ffffff')}
                            style={{backgroundColor: '#ffffff'}}
                          />
                          <span
                            onClick={() => props.actions.setBgColor('#000000')}
                            style={{backgroundColor: '#000000'}}
                          />
                          <span
                            onClick={() => props.actions.setBgColor('#888888')}
                            style={{backgroundColor: '#888888'}}
                          />
                          <span
                            onClick={() => props.actions.setBgColor('#c13e32')}
                            style={{backgroundColor: '#c13e32'}}
                          />
                          <span
                            onClick={() => props.actions.setBgColor('#6495ed')}
                            style={{backgroundColor: '#6495ed'}}
                          />
                          <span
                            onClick={() => props.actions.setBgColor('#88de23')}
                            style={{backgroundColor: '#88de23'}}
                          />
                        </div>
                        <div styleName="images">
                          <ul>
                            {Object.keys(props.backgrounds).map((bg) => {
                              return (
                                <li key={bg}>
                                  <span onClick={() => props.actions.setBgImage(bg)}>{bg}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                      </div>
                    </div> : null
                  }
                  {props.screen.deviceMode ?
                    (
                      <div styleName="option">
                        <div styleName="label">
                          Zoom:
                        </div>
                        <div styleName="list">
                          <div styleName="zoom">
                            <span styleName="zoom_minus" onClick={() => props.actions.setZoom('-') }/>
                            <span styleName="zoom_reset" onClick={() => props.actions.setZoom('1:1') }/>
                            <span styleName="zoom_plus" onClick={() => props.actions.setZoom('+') }/>
                          </div>
                        </div>
                      </div>
                    ) : null
                  }
                </div>


                <div styleName="navigation-component__autoMode">
                  <h2 styleName="no-border">
                    Auto adjust
                    {props.screen.deviceMode ?
                      <span onClick={() => props.actions.changeDevice(false)}>Off</span> :
                      <span
                        styleName="on"
                        onClick={() => props.actions.changeDevice(props.screen.currentDevice)}>
                        On
                      </span>
                    }
                  </h2>
                </div>
              </div>
            </li>

            <li styleName="navigation-component__listElem">
              <span styleName="navigation-component__btn navigation-component__btnPages hasSubmenu"></span>
              <div styleName="navigation-component__submenu">
                <h2>Pages</h2>
                <ul
                  styleName="navigation-component__pages"
                  style={{bottom: props.numberOfVersions > 1 ? 45 : 15}}
                >
                  {Object.keys(props.pages).map((pageName) => {
                    return (<li key={pageName}>
                      <NavLink
                        styleName={props.screen.currentPageName === pageName ? 'active' : null}
                        to={`/project/${props.projectId}/${pageName}/${props.urlParams}`}
                      >
                        {pageName}
                      </NavLink>
                    </li>);
                  })}
                </ul>
                {props.numberOfVersions > 1 ?
                  <div styleName="navigation-component__versions">
                    <h2 styleName="no-border">
                      Version:
                      <span
                        onClick={() => props.actions.changeDesignVersion('A')}
                        styleName={props.screen.currentDesignVersion === 'A' ? 'active' : null}>
                        A
                      </span>
                      <span
                        onClick={() => props.actions.changeDesignVersion('B')}
                        styleName={props.screen.currentDesignVersion === 'B' ? 'active' : null}>
                        B
                      </span>
                    </h2>
                  </div> : null }
              </div>
            </li>
          </ul>
        </div> :
        <div styleName="navigation-component" className="navigation-component">
          <div styleName="navigation-component__btnMenuWrapper">
            <span
              styleName="navigation-component__btn navigation-component__btnClose"
              onClick={() => props.actions.showComments(false)}
            />
            <span
              styleName="navigation-component__btn navigation-component__btnAddComment"
              onClick={() => props.actions.showComments(false)}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default cssmodules(Navigation, styles, {allowMultiple: true});
