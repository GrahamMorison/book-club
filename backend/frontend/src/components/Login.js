import React from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'

const CustomTextField = styled(TextField)(({ theme }) => ({
  marginTop: 20,
  marginBottom: 20,
  display: 'block'
}))

const Root = styled(Box)(({ theme }) => ({
  display: 'flex'
}))

const Page = styled(Box)(({ theme }) => ({
  background: '#f9f9f9',
  width: '100%',
  padding: theme.spacing(3)
}));

const FakeToolBar = styled(Toolbar)(({ theme }) => ({
  toolbar: theme.mixins.toolbar
}))

const Login = (props) => (
  <Root>
    <AppBar
      elevation={0}
      color='secondary'
    >
      <Toolbar>
        <Typography
          sx={{flexGrow: 1}}
        >
          Book Club Tracker
        </Typography>
        {
          props.name && <Typography> {props.name} </Typography>
        }
      </Toolbar>
    </AppBar>
    
    <Page>
      <FakeToolBar />
      <form onSubmit={props.handleNameEntered}>
        <CustomTextField 
          label="Name" 
          variant="outlined"
          fullWidth
          required
          color='secondary'
        />
        <Button
          type="submit"
          variant="contained"
          color='secondary'
        >
          Login
        </Button>
      </form>
      
        <Typography padding={2}>
        </Typography>
        <Typography padding={2}>
          Welcome to the Book Club Tracker! If you are wanting to test out the functionality of the application, log in using "Guest" and there will be some default data already
          set up for you to interact with the application.
          
          If you have any questions, or would like more information, <a href="mailto:rmorison3@gmail.com">you can reach me via email.</a>
        </Typography>
      
    </Page>
  </Root>
)

export default Login;



// <Button onClick={props.handleNameEntered} variant="contained">Login</Button>