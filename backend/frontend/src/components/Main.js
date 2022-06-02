import React from 'react';
import Login from './Login';
import VotingPage from './VotingPage';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: blue
  }
})

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined
    }
  }

  handleNameEntered = async (e) => {
    e.preventDefault();


    console.log(e);
    console.log(e);
    const name = e.target[0].value;
    const res = await fetch('/users/' + name);
    console.log(res)
    const data = await res.json()
    if (data.length === 0) {
      await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      })
    }
    this.setState({
      name
    })
  }

  handleLogout = (e) => {
    this.setState({ name: undefined })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
      <div>
          {
            !this.state.name ? 
              <Login 
                handleNameEntered={this.handleNameEntered}
              /> :
              <div>  
                <VotingPage 
                  name={this.state.name}
                  getListOfRoundsToVoteOn={this.getListOfRoundsToVoteOn}
                  handleLogout={this.handleLogout}
                />
              </div>
          }
      </div>
      </ThemeProvider>
    )
  }
}

//Render Logic: if there isn't a name, show the login page
//Once a name is given, show a list of rounds that are open for voting or a
//create/edit round button