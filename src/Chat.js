import React from 'react';
import {
  Box,
  Grid,
  Text,
  TextArea,
} from "grommet";

function Contacts({ chatInfo }) {
  const [textInput, setTextInput] = React.useState('');
  
  return (
    <Box height="100%">
    {chatInfo &&
      <Grid
        fill
        rows={['7%', 'auto', '20%']}
        columns={['100%']}
        areas={[
          { name: 'header', start: [0, 0], end: [0, 0] },
          { name: 'display', start: [0, 1], end: [0, 1] },
          { name: 'input', start: [0, 2], end: [0, 2] },
        ]}
      >
        <Box gridArea="header" justify="center" pad={{ left: "25px" }} background="light-1">
          <Text weight="bold" size="20px">
            {chatInfo && chatInfo.displayName}
          </Text>
        </Box>
        <Box gridArea="display" border="top" background="light-1">
        </Box>
        <Box gridArea="input" border="top" background="light-1">
          <TextArea
            fill
            value={textInput}
            onChange={event => setTextInput(event.target.value)}
            plain={true}
            resize={false}
          />
        </Box>
      </Grid>
    }
    </Box>

  );
}

export default Contacts;
