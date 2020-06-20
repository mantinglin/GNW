import React, { useState } from 'react';
import {
  grommet,
  Grommet,
} from "grommet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login.js';
import SignUp from './SignUp.js';
import ChatPage from './ChatPage.js';

function App() {
  return (
    <Grommet theme={grommet} full>
      <Router>
          <Switch>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/chat">
              <ChatPage />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
