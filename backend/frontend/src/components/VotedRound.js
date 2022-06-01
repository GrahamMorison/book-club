import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const VotedRound = (props) => (
  <ListItem
    button
    onClick={(e) => { props.handleAlreadyVotedOnSelection(props.round) }}
  >
    <ListItemText primary={props.round} />
  </ListItem>
)

export default VotedRound;