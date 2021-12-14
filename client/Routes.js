import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Calendar from "./components/Calendar";
import MyResponsivePie from "./components/PieGraph";
import Home from "./components/Home";
import Mood from "./components/Mood";
import Stats from "./components/Stats";
import Activities from "./components/Activities";
import Loader from "./components/Loader";
import { me } from "./store";

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn, currentMood } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/">
              <Redirect to="/mood" />
            </Route>
            <Route path="/home" render={(props) => <Home {...props} currentMood={currentMood}/>}/>
            <Route path="/mood" render={(props) => <Mood {...props} currentMood={currentMood} />}/>
            <Route path="/calendar" component={Calendar} />
            <Route path="/activities" component={Activities} />
            <Route path="/pie" component={MyResponsivePie} />
            <Route path="/stats" component={Stats} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        <Switch>
          <Route path="/loader" component={Loader} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
