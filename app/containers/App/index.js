/**
 *
 * App
 *
 */
import React from 'react';
import { BrowserRouter, Switch, Route, HashRouter} from 'react-router-dom';
import { DAEMON } from 'utils/constants';

// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectApp, makeLogout } from './selectors';
import reducer from './reducer';
import saga from './saga';

import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Full from 'containers/Full/';


import { api } from 'api';

import { Alert } from 'reactstrap';

// Import Ability Context
import { AbilityContext } from 'ability-context';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../../scss/style.scss';


class App extends React.PureComponent {
  componentDidMount() {
    // Remove loader, when page is loaded
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      setTimeout(() => {
        ele.classList.add('available');
        setTimeout(() => {
          ele.outerHTML = '';
        }, 2000);
      }, 1000);
    }
  }

  render() {
    const { permissions } = this.props.app;

    let content = null;


    if (true) {
      content = this.render_main();
    } else {
      content = this.render_login();
    }
      // <Alert color="danger">Connection error</Alert>

    return (<AbilityContext.Provider value={permissions}>{content}</AbilityContext.Provider>);
  }

  render_login() {
    return (<LoginPage />);
  }

  render_main() {
    const { gravatar } = this.props.app;
    return (
      <HashRouter>
        <Switch>
          <Route path="/111" name="Home" component={Full} />
          <Route path="/" name="Home" render={(props) => <Full gravatar={gravatar} {...props} />} />
          <Route component={NotFoundPage} />
        </Switch>
      </HashRouter>
    );
  }

}

// App.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'app', reducer });
const withSaga = injectSaga({ key: 'homePageSchedule', saga, mode: DAEMON });


export default compose(
  withReducer,
  withSaga,
  withConnect,
)(App);
