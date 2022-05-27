import React from 'react';
import VotedRound from './VotedRound';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2)
}))

const RoundsAlreadyVotedOnList = (props) => (
  <div>
  <Title variant="h6">
    View Results:
  </Title>
    {
      props.roundsAlreadyVotedOn.length ? 
      <List>
      {
        props.roundsAlreadyVotedOn.map((round) => (
          <VotedRound 
            round={round}
            key={round}
            handleAlreadyVotedOnSelection={props.handleAlreadyVotedOnSelection}
          />
        ))
      }
      </List> :
      <div></div>
    }
  </div>
)

export default RoundsAlreadyVotedOnList;