import React from 'react';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const ResultsPage = (props) => (
  <Stack spacing={2}>
    {
      props.users.length === props.usersThatVoted.length ?
      <div>
        <Typography>Final Results:</Typography>
      </div> :
      <div>
        <Typography>{props.usersThatVoted.length} out of {props.users.length} users have already voted.</Typography>
        <Typography>Results:</Typography>
      </div>
    }
    {
      props.books.map((book) => (
        <Stack spacing={.5} key={book.title}>
          <Typography>{book.title} by {book.author}</Typography>
          <Typography>Average Rank: {book.totalRank / props.usersThatVoted.length}</Typography>
        </Stack>
      ))
    }
    
    <Button color="secondary" variant="contained" onClick={props.handleBackButton}>
      Back
    </Button>
  </Stack>
)

export default ResultsPage;