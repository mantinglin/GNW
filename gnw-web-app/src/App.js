import React, { useState } from 'react';
import {
  Box,
  Button,
  grommet,
  Grid,
  Grommet,
} from "grommet";
import {
  ChatOption,
  ContactInfo,
} from "grommet-icons";
import Chats from "./Chats.js"
import Contacts from "./Contacts.js"
import SignUp from './SignUp.js';
import './App.css';

const sidebarButtons = [
  { buttonID: 0, buttonName: "Chats", buttonIcon: <ChatOption /> },
  { buttonID: 1, buttonName: "Contacts", buttonIcon: <ContactInfo /> },
];

const mainPageMapping = [
  <Chats />,
  <Contacts />,
];

const Side = ({sidebarSelectionHandle}) => (
  <Box
    background="neutral-2"
    align="center"
    height="100vh"
    pad={{ top: "50px" }}
    gap="50px"
  >
    {sidebarButtons.map(item =>
      <Button plain focusIndicator={false} icon={item.buttonIcon} key={item.buttonID} onClick={() => sidebarSelectionHandle(item.buttonID)} />
    )}
  </Box>
);

function App() {
  const [sidebarSelection, setSidebarSelection] = useState(0);

  return (
    <div className="App">
      <div className="header">
        <img src={'./images/logo.png'} alt="Logo" className="logoImg" />
        <h1 className="headerText">GNW</h1>
      </div>
      <div className="mainWrapper">
        <div>
          <img src={'./images/login_illustration.png'} alt="Logo Illustration" className="logoIllustration" />
        </div>
        <div className="signUpContainer">
          <SignUp className="sign_up" />
        </div>
      </div>
      <div className="footer">
        <a target="_blank">
          © 2020 COMMUNISTE EN CALIFORNIA. ALL RIGHTS RESERVED.
        </a>
      </div>
    </div>
    // <Grommet theme={grommet} full>
    //   <Grid
    //     fill
    //     rows={['100vh']}
    //     columns={['60px', 'auto']}
    //     areas={[
    //       { name: 'nav', start: [0, 0], end: [0, 0] },
    //       { name: 'main', start: [1, 0], end: [1, 0] },
    //     ]}
    //   >
    //     <Box gridArea="nav">
    //       <Side sidebarSelectionHandle={setSidebarSelection}/>
    //     </Box>
    //     <Box gridArea="main">
    //       {mainPageMapping[sidebarSelection]}
    //     </Box>
    //   </Grid>
    // </Grommet>
  );
}

export default App;
