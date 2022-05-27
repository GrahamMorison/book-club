import React from 'react';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default class UserSubmissionForm extends React.Component {
  state = {
    error: undefined
  }

  handleUserSubmission = (e) => {
    e.preventDefault();
    console.log(e)
    const user = e.target[0].value.trim();
    const error = this.props.handleUserSubmission(user);

    this.setState(() => ({ error }));

    if (!error) {
      e.target[0].value = '';
    }
  }

  render() {
    return (
      <Box>
        {this.state.error && <Typography color='error' gutterBottom>{this.state.error}</Typography>}
        <form onSubmit={this.handleUserSubmission}>
          <TextField 
            label="User" 
            variant="outlined"  
            color="secondary" 
            size="small"
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="secondary"
          >
            Submit User
          </Button>
        </form>
      </Box>
    );
  }
}