import React from 'react';
import Button from '@mui/material/Button'

const SubmitRankings = (props) => (
    <Button
      onClick={props.handleRankingsSubmission}
      disabled={props.duplicateRankings}
      variant='contained'
      color='secondary'
    >
      Submit Rankings
    </Button>
)

export default SubmitRankings;