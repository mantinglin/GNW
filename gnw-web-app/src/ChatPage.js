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
import { useLocation } from "react-router-dom";
import Chats from "./Chats.js"
import Contacts from "./Contacts.js"

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

export default function ChatPage() {
  const [sidebarSelection, setSidebarSelection] = useState(0);

  let location = useLocation();

  console.log(location.state.userInfo)

  return (
    <div>
      <Grid
        fill
        rows={['100vh']}
        columns={['60px', 'auto']}
        areas={[
          { name: 'nav', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}
      >
        <Box gridArea="nav">
          <Side sidebarSelectionHandle={setSidebarSelection}/>
        </Box>
        <Box gridArea="main">
          {mainPageMapping[sidebarSelection]}
        </Box>
      </Grid>
    </div>
  );
}
