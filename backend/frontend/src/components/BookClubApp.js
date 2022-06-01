import React from 'react';
import BookSubmissionsPage from './BookSubmissionsPage';
import BookVotingPage from './BookVotingPage';

class BookClubApp extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {
      submittedBooks: [],
      bookSubmissionComplete: false, 
      averageBookRankings: {},
      individualBookRanking: {},
      numOfRankingSubmitted: 0,
      usersThatSubmittedRanks: [],
      duplicateRankings: true
    }
  }
  handleBookSubmission = (book) => {
    if(!book) {
      return 'Please enter a valid book'
    } else if (this.state.submittedBooks.indexOf(book) > -1) {
      return 'This book was already submitted'
    }

    this.setState((prevState) => ({
      submittedBooks: prevState.submittedBooks.concat([book]),
      // prevState.averageBookRankings.concat({ [book]: 0 })
    }));
  }
  handleRemoveBook = (bookToRemove) => {
    this.setState((prevState) => ({
        submittedBooks: prevState.submittedBooks.filter((book) => book !== bookToRemove)
    }))
  }
  handleStartVoting = () => {
    this.setState(() => ({
      bookSubmissionComplete: true
    }));
    
    this.state.submittedBooks.forEach((book) => {
      this.setState((prevState) => ({
        averageBookRankings: {
          ...prevState.averageBookRankings,
          [book]: 0
        },
        individualBookRanking: {
          ...prevState.individualBookRanking,
          [book]: 1
        }
      }));
    })
  }
  handleRankingChange = (e) => {
    e.preventDefault();

    const selectedIndex = e.target.options.selectedIndex;
    const bookTitle = e.target.id;
    const ranking = Number(e.target.options[selectedIndex].outerText);
    const currentIndividualRankings = {
      ...this.state.individualBookRanking,
      [bookTitle]: ranking
    }

    this.setState(() => ({
      individualBookRanking: {
        ...currentIndividualRankings
      }
    }))

    const sortedIndividualRankings = Object.values(currentIndividualRankings).sort();

    for (let index = 0; index < sortedIndividualRankings.length; index++) {
      if (sortedIndividualRankings[index] !== index + 1) {
        this.setState(() => ({
          duplicateRankings: true
        }))
        break;
      } else {
        this.setState(() => ({
          duplicateRankings: false
        }))
      }
    }
  }
  handleRankingsSubmission = () => {
    this.setState((prevState) => ({
      numOfRankingSubmitted: prevState.numOfRankingSubmitted + 1
    }))
    this.setState((prevState) => {
      const currentAvgRankings = prevState.averageBookRankings;

      for(let book in prevState.individualBookRanking) {
        currentAvgRankings[book] = currentAvgRankings[book] + prevState.individualBookRanking[book];
      }
      
      return {
        averageBookRankings: {
          ...currentAvgRankings
        }
      }
    })
  }
  render() {
    return(
      <div>
        {!this.state.bookSubmissionComplete && 
          <BookSubmissionsPage
            submittedBooks={this.state.submittedBooks}
            bookSubmissionComplete={this.state.bookSubmissionComplete}
            handleBookSubmission={this.handleBookSubmission}
            handleRemoveBook={this.handleRemoveBook}
            handleStartVoting={this.handleStartVoting}
          />
        }
        {this.state.bookSubmissionComplete &&
          <BookVotingPage 
            submittedBooks={this.state.submittedBooks}
            bookSubmissionComplete={this.state.bookSubmissionComplete}
            averageBookRankings={this.state.averageBookRankings}
            individualBookRanking={this.state.individualBookRanking}
            handleRankingChange={this.handleRankingChange}
            handleRankingsSubmission={this.handleRankingsSubmission}
            numOfRankingSubmitted={this.state.numOfRankingSubmitted}
            duplicateRankings={this.state.duplicateRankings}
          />
        }
      </div>
    )
  }
}

export default BookClubApp;