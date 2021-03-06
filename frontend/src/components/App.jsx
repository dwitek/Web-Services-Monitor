import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";

import { loadUser } from "../actions/auth";

import { Container } from "react-bootstrap";
import { DashboardContainer } from "./dashboard/DashboardContainer";
import styles from "./App.less";
import { StatusPageContainer } from "./statuspage/StatusPageContainer";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
  transition: "fade"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header className={styles.header} />
              <Alerts />
              <Container fluid={true} className={styles.container}>
                {" "}
                {/* Make it 100% width*/}
                <Switch>
                  <PrivateRoute exact path="/" component={DashboardContainer} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route component={StatusPageContainer} />
                </Switch>
              </Container>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
