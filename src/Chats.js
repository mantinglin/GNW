import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  Text,
} from "grommet";
import Chat from "./Chat.js"

const ongoingChats = [
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
  { userID: "mantinglin", displayName: "Tinglin Man" },
  { userID: "luoxiaolei", displayName: "Xiaolei Luo" },
];

function Chats() {
  const [chatIdx, setChatIdx] = React.useState(-1);

  return (
    <Grid
      fill
      rows={['100%']}
      columns={['260px', 'auto']}
      areas={[
        { name: 'chats', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [1, 0], end: [1, 0] },
      ]}
    >
      <Box gridArea="chats" background="white" pad={{ left: "5px" }} border="right" >
        <Box height="7%" align="center" justify="center" margin={{ left: "-5px" }}>
          <Text weight="bold" size="16px">Chats</Text>
        </Box>
        <Box overflow="auto">
          <List data={ongoingChats} margin={{ top: "px" }} pad={{ }}>
            {(chat, index) => (
              <Button fill onClick={() => setChatIdx(index)} focusIndicator={false} style={{ backgroundColor: index == chatIdx ? "#F0F0F0" : "white" }}>
                <Box height="75px" pad={{ left: "10px", right: "15px" }}>
                  <Grid
                    fill
                    key={index}
                    rows={['50%', '50%']}
                    columns={['25%', '55%', '20%']}
                    areas={[
                      { name: 'ava', start: [0, 0], end: [0, 1] },
                      { name: 'username', start: [1, 0], end: [1, 0] },
                      { name: 'chatText', start: [1, 1], end: [1, 1] },
                      { name: 'timestamp', start: [2, 0], end: [2, 0] },
                    ]}
                    >
                    <Box gridArea="ava" justify="center">
                      <Avatar size="50px" round="2px" background="light-1">{chat.displayName.charAt(0)}</Avatar>
                    </Box>
                    <Box gridArea="username" justify="end">
                      <Text weight="bold" size="15px">{chat.displayName}</Text>
                    </Box>
                    <Box gridArea="chatText" justify="start" pad={{ top: "5px" }}>
                      <Text size="14px" color="grey"></Text>
                    </Box>
                    <Box gridArea="timestamp" justify="end" align="end">
                      <Text size="13px" color="grey">16:12</Text>
                    </Box>
                  </Grid>
                </Box>
              </Button>
            )}
          </List>
        </Box>
      </Box>
      <Box gridArea="main" width={{ min: "600px" }}>
        <Chat chatInfo={chatIdx != -1 ? ongoingChats[chatIdx] : null} />
      </Box>
    </Grid>
  );
}

export default Chats;
