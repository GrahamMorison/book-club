import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

class BookDescriptionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    }
  }

  handleModalOpen = async () => {
    await this.setState({
      modalOpen: true
    })
  }

  handleModalClose = async () => {
    await this.setState({
      modalOpen: false
    })
  }

  render() {
    return (
      <div>
        <Button 
          variant="text" 
          color='secondary' 
          onClick={this.handleModalOpen}
          component="span"
        >
          {this.props.book.title}
        </Button>
        <Dialog
          open={this.state.modalOpen}
          onClose={this.handleModalClose}
        >
          <DialogTitle>
            {this.props.book.title}
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
            <Typography gutterBottom>Author: {this.props.book.author}</Typography>
            <Typography gutterBottom>Description: {this.props.book.description}</Typography>
            {this.props.book.thumbnail && <img src={this.props.book.thumbnail} alt="Thumbnail" />}
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

export default BookDescriptionModal;