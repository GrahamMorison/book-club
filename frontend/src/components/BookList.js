import React from 'react';
import Book from './Book';
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const BookList = (props) => {
  return (
    <Stack spacing={.5}>
    <Typography>Books:</Typography>
      {
        props.books.map((book) => (
          <Book 
            key={book.title} 
            book={book.title}
            author={book.author}
            handleRemoveBook={props.handleRemoveBook}
            stage={props.stage}
          />))
      }
    </Stack>
  );
}

export default BookList;