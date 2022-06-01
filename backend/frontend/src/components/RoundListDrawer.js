import React from 'react'
import OpenVotingRoundList from './OpenVotingRoundList';
import OpenAdminRoundList from './OpenAdminRoundList';
import RoundsAlreadyVotedOnList from './RoundsAlreadyVotedOnList';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton'

const drawerWidth = 240;

const RoundListDrawer = (props) => {
  
  const CustomDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    background: '#f9f9f9'
  }))

  const Title = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }))

  const drawer = (
    <div>
      <List>
        <ListItem
          button
          key='Create'
          onClick={props.handleCreateNewRound}
        >
          <ListItemIcon>
            <AddCircleOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Create New Round' />
        </ListItem>
      </List>
      <Divider color='#f9f9f9' />
      
      { props.userData && 
        <OpenVotingRoundList 
          currentVotingRounds={props.currentVotingRounds}
          handleVotingRoundSelection={props.handleVotingRoundSelection}
        />
      }
      <Divider color='#f9f9f9' />

      { props.userData && 
        <OpenAdminRoundList 
          currentAdminRounds={props.currentAdminRounds}
          handleAdminRoundSelection={props.handleAdminRoundSelection}
          userData={props.userData}
        />
      }
      <Divider color='#f9f9f9' />

      {
        props.userData &&
        <RoundsAlreadyVotedOnList 
          roundsAlreadyVotedOn={props.roundsAlreadyVotedOn}
          handleAlreadyVotedOnSelection={props.handleAlreadyVotedOnSelection}
        />
      }
      </div>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <CustomDrawer
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant="permanent"
        anchor="left"
        open
      >
        <Title>
          <Typography variant="h5" color="inherit">
            Open Rounds
          </Typography>
        </Title>
        <Divider color='#f9f9f9' />
        {drawer}    
      </CustomDrawer>
      <CustomDrawer
        variant="temporary"
        onClose={props.handleCloseDrawer}
        open={props.drawerOpen}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
      >
        <Title>
          <Typography variant="h5" color="inherit">
            Open Rounds
          </Typography>
          <IconButton onClick={props.handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </Title>
        <Divider color='#f9f9f9' />
        {drawer}
      </CustomDrawer>
    </Box>
  )
}
export default RoundListDrawer;