import React from 'react';
import OpenAdminRound from './OpenAdminRound';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2)
}))

const OpenAdminRoundList = (props) => (
  <div>
    <Title variant="h6">
      Edit:
    </Title> 
    {
      !props.currentAdminRounds.length ?
      <div></div> :
      <List>
      {props.currentAdminRounds.map((round) => (
        <OpenAdminRound 
          handleAdminRoundSelection={props.handleAdminRoundSelection}
          userData={props.userData}
          round={round}
          key={round}
        />
      ))}
      </List>
    }
  </div>
)

export default OpenAdminRoundList;