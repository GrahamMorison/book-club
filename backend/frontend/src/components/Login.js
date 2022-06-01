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
    </Page>
  </Root>
)

export default Login;



// <Button onClick={props.handleNameEntered} variant="contained">Login</Button>