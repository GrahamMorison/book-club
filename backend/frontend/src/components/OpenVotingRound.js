import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const OpenVotingRound = (props) => (
  <ListItem
    button
    onClick={(e) => {props.handleVotingRoundSelection(props.round)}}
  >
    <ListItemText primary={props.round} />
  </ListItem>
)

export default OpenVotingRound;