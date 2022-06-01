import React, { useState } from 'react';
import BookList from './BookList';
import BookSubmissionForm from './BookSubmissionForm';
import UserList from './UserList';
import UserSubmissionForm from './UserSubmissionForm';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import ButtonGroup from '@mui/material/ButtonGroup'

const AdminPage = (props) => {
  const [clubName, setClubName] = useState('');


  return (
    <div>
    <Stack spacing={1}>
    {
      props.clubName ? 
      <Typography>Club Name: {props.clubName}</Typography> :
      <TextField 
        label="Club Name"
        variant="outlined"
        color="secondary"
        size="small"
        fullWidth
        required
        onChange={(e) => setClubName(e.target.value)}
      />
    }  
    
      {
        props.stage === 1 && 
        <UserSubmissionForm 
          handleUserSubmission={props.handleUserSubmission} 
        />
      }
      <UserList 
        users={props.users}
        stage={props.stage}
        handleRemoveUser={props.handleRemoveUser}
      />
      
      {
        props.stage === 1 && 
        <BookSubmissionForm 
          handleBookSubmission={props.handleBookSubmission}
          handleBookSearch={props.handleBookSearch}
        />
      }
      <BookList 
        books={props.books}
        stage={props.stage}
        handleRemoveBook={props.handleRemoveBook}
      />
  </Stack>
  <ButtonGroup variant="contained" color="secondary" sx={{marginTop: 1}}>
    <Button onClick={(e) => props.handleSubmitRound(props.clubName ? props.clubName : clubName)}>Submit Round</Button>
    <Button onClick={props.handleBackButton}>Back</Button>
    <Button onClick={props.handleDeleteRound}>Delete Round</Button>
  </ButtonGroup>
  </div>
  )
}

export default AdminPage;




// componentDidMount = async () => {
//   const res = await fetch('/votingRounds');
//   const data = await res.json();
//   console.log(data);
//   if (data[0]) {
//     this.setState({
//       books: data[0].books,
//       users: data[0].users,
//       usersThatVoted: data[0].usersThatVoted,
//       stage: data[0].stage,
//       _id: data[0]._id
//     })
//   } else {
//     const res = await fetch(`/votingRounds`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await res.json();
//     this.setState({
//       books: data.books,
//       users: data.users,
//       usersThatVoted: data.usersThatVoted,
//       stage: data.stage,
//       _id: data._id
//     });
//   }
//   console.log(this.state)
// }

// constructor(props) {
//   super(props);
//   this.state = {
//     books: [],
//     users: [],
//     usersThatVoted: [],
//     stage: 1,
//     _id: ''
//   }
// }