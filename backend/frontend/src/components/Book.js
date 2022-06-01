import React from 'react';
import Chip from '@mui/material/Chip'

const Book = (props) => {
  return (
    <div>
      <Chip 
        color="secondary" 
        onDelete={() => { props.handleRemoveBook(props.book)} } 
        label={props.book}
      />
    </div>
  );
}

export default Book;