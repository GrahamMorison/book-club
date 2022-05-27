import React from 'react';
import OpenVotingRound from './OpenVotingRound';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2)
}))

const OpenVotingRoundList = (props) => (
  <div>
  <Title variant="h6">
    Vote:
  </Title>
  {
    props.currentVotingRounds.length ?
    <List>
    {props.currentVotingRounds.map((round) => (
        <OpenVotingRound 
          round={round}
          key={round}
          handleVotingRoundSelection={props.handleVotingRoundSelection}
        />
    ))}
    </List> : <div></div>
  }
  </div>
)

export default OpenVotingRoundList;