import React from 'react';
import SubmitRankings from './SubmitRankings';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BookDescriptionModal from './BookDescriptionModal'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

const VotingRanksList = (props) => (
    <Stack spacing={2}>
      {
        props.books.map((book, index) => (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <FormControl sx={{ m: 1, minWidth: 60 }} size="small" >
            <InputLabel color='secondary'>Rank</InputLabel>
              <Select
                key={book.title}
                onChange={props.handleRankingChange}
                value={book.currentUserRank}
                name={book.title}
                color='secondary'
                label='Rank'
              >
              {
                props.books.map((book, index) => (
                  <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                ))
              }
              </Select>
            </FormControl>
            <BookDescriptionModal book={book} />
          </Box>
        ))
      }
    
    <div>
      <SubmitRankings 
        handleRankingsSubmission={props.handleRankingsSubmission}
        duplicateRankings={props.duplicateRankings}
      />
      <Button 
        onClick={props.handleBackButton}
        variant='contained'
        color='secondary'
      >
        Back
      </Button>
    </div>
  </Stack>
)

export default VotingRanksList;