import React from 'react';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField'

const defaultState = {
  error: undefined,
  data: undefined,
  modalOpen: false,
  bookSearchIndex: 0
}


export default class BookSubmissionForm extends React.Component {
  state = {
    ...defaultState
  }

  handleBookSubmission = async (e) => {
    e.preventDefault();
    const data = structuredClone(this.state.data);
    const index = this.state.bookSearchIndex
    console.log(data, index)
    const bookSelected = {
        title: data.items[index].volumeInfo.title,
        author: data.items[index].volumeInfo.authors[0],
        description: data.items[index].volumeInfo.description,
        thumbnail: data.items[index].volumeInfo.imageLinks.thumbnail,
        googleId: data.items[index].id
    }
    
    this.props.handleBookSubmission(bookSelected);
    await this.setState({ ...defaultState })
    

    //need to wire up the fetch to google books and list the top 3 options from the
    //search. once a book is selected, send it back through the function that sets
    //the state. need to fix voting so each user can only vote once and view the current
    //results

    //need to fix the create new round button for users that don't exist
  }

  handleBookSearch = async (e) => {
    e.preventDefault();
    const submittedBook = e.target[0].value.trim();
    const error = this.props.handleBookSearch(submittedBook)
    await this.setState({ error })

    if (!error) {
      const res = await fetch(`/bookRequest/${submittedBook}`);
      const data = await res.json();
      console.log(data)
      console.log(this.state)
      await this.setState({ data })
      await this.setState({ modalOpen: true })
      e.target[0].value = '';
      console.log(this.state)
    }
  }

  handleModalClose = async () => {
    await this.setState({
      modalOpen: false
    })
  }

  handleNextButton = async () => {
    await this.setState((prevState) => ({ bookSearchIndex: prevState.bookSearchIndex + 1 }))
  }

  handlePreviousButton = async () => {
    await this.setState((prevState) => ({ bookSearchIndex: prevState.bookSearchIndex - 1 }))
  }

  render() {
    return (
    <div>
      {this.state.error && <p>{this.state.error}</p>}
      <form onSubmit={this.handleBookSearch}>
        <TextField 
          label="Book" 
          variant="outlined"  
          color="secondary" 
          size="small"
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="secondary"
        >
          Search for Book
        </Button>
      </form>

      {this.state.data && <Dialog
        open={this.state.modalOpen}
        onClose={this.handleModalClose}
      >
        <DialogTitle>
          {this.state.data.items[this.state.bookSearchIndex].volumeInfo.title}
          <IconButton 
            onClick={this.handleModalClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>Author: {this.state.data.items[this.state.bookSearchIndex].volumeInfo.authors[0]}</Typography>
          <Typography gutterBottom>Description: {this.state.data.items[this.state.bookSearchIndex].volumeInfo.description}</Typography>
          <div>{this.state.data.items[this.state.bookSearchIndex].volumeInfo.imageLinks && <img src={this.state.data.items[this.state.bookSearchIndex].volumeInfo.imageLinks.thumbnail} alt="Thumbnail" />}</div>
          <ButtonGroup variant="contained">
            <Button onClick={this.handleBookSubmission}>Add To List</Button>
            <Button onClick={this.handlePreviousButton} disabled={this.state.bookSearchIndex === 0}>Previous</Button>
            <Button onClick={this.handleNextButton} disabled={this.state.bookSearchIndex === 5}>Next</Button>
          </ButtonGroup>
        </DialogContent>
      </Dialog>}

    </div>
    );
  }
}


// {
//   <div>
//     <form onSubmit={this.handleBookSubmission}>
//       <p>
//         Is this the book you want to submit?<button>Yes</button>
//       </p>
//       <p>Title: {this.state.data.items[0].volumeInfo.title}</p>
//       <p>Author: {this.state.data.items[0].volumeInfo.authors[0]}</p>
//       <p>Description: {this.state.data.items[0].volumeInfo.description}</p>
//       {this.state.data.items[0].volumeInfo.imageLinks && <p><img src={this.state.data.items[0].volumeInfo.imageLinks.thumbnail} alt="Thumbnail" /></p>}
//     </form>
//   </div>
// }