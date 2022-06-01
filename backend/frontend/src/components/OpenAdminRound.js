import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const OpenAdminRound = (props) => (
  <ListItem
    button
    onClick={(e) => { props.handleAdminRoundSelection(props.round, props.userData) }}
  >
    <ListItemText primary={props.round} />
  </ListItem>
)

export default OpenAdminRound;