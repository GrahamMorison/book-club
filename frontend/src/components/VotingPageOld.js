import React from 'react';
import SubmitRankings from './SubmitRankings';

class VotingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duplicateRankings: true,
      voteSubmitted: false,
      canUserVote: false
    }
  }


  componentDidMount = async () => {
    const setName = () => {
      this.setState({
        name: this.props.name
      })
    }
    await setName();

    const nameRes = await fetch(`/users/${this.state.name}`);
    const nameData = await nameRes.json();
    console.log(nameData)


    // const res = await fetch('/votingRounds');
    // const data = await res.json();
    // console.log(data);
    // if (data[0]) {
    //   this.setState(() => ({
    //     books: data[0].books,
    //     users: data[0].users,
    //     usersThatVoted: data[0].usersThatVoted,
    //     stage: data[0].stage,
    //     _id: data[0]._id
    //   }))
    // }
    console.log(this.state)
  }

  handleRankingChange = async (e) => {
    e.preventDefault();

    const selectedIndex = e.target.options.selectedIndex;
    const bookTitle = e.target.id;
    const selectedRanking = Number(e.target.options[selectedIndex].outerText);
    
    const books = structuredClone(this.state.books) // structured clone allows deep cloning without copying the reference

    books.forEach(book => {
      if (book.title === bookTitle) {
        book.currentUserRank = selectedRanking
      }
    });

    const updateBooksInState = () => {
      this.setState(() => ({
        books:  [...books]
      }))
    }

    await updateBooksInState();

    const updateDuplicateRankings = () => {
      const sortedUserRanks = []; 
      books.forEach(book => sortedUserRanks.push(book.currentUserRank))
      sortedUserRanks.sort()

      for (let index = 0; index < sortedUserRanks.length; index++) {
        if (sortedUserRanks[index] !== index + 1) {
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

    await updateDuplicateRankings();
  }

  handleRankingsSubmission = async (e) => {
    //need to add the user to the userswhovoted array to make sure users cant
    //vote more than once

    e.preventDefault();

    

    const books = structuredClone(this.state.books);
    books.forEach((book) => {
      book.totalRank += book.currentUserRank;
      book.currentUserRank = 1;
    })

    const updateBooksInState = () => {
      this.setState(() => ({
        books: [...books]
      }))
    }
    await updateBooksInState();

    const updateVoteSubmitted = () =>  {
      this.setState(() => ({
        voteSubmitted: true
      }))
    }

    await updateVoteSubmitted();

    const updateUserSubmitted = () => {
      this.setState((prevState) => ({
        usersThatVoted: [...prevState.usersThatVoted, e.target.form[0].value]
      }))
    }

    await updateUserSubmitted();

    const id = this.state._id;

    const res = await fetch(`/votingRounds/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        books: this.state.books,
        stage: this.state.stage,
        usersThatVoted: this.state.usersThatVoted
      })
    })

    const data = await res.json();
    return data;

  }

  handleUserNameChange = async (e) => {
    e.preventDefault();

    let canUserVote = false;
    const userNameEntered = e.target.value;
    const userHasAlreadyVoted = this.state.usersThatVoted.filter(name => name === userNameEntered)


    this.state.users.forEach(user => {
      if (user === userNameEntered && user !== userHasAlreadyVoted[0]) {
        canUserVote = true;
      } 
    })

    const setUserState = () => {
      this.setState(() => ({
        canUserVote
      }))
    }
    await setUserState();
  }

  render() {
    return (
      <div>
        {this.state.voteSubmitted && <div>Thank you for voting!</div>}
        {!this.state.voteSubmitted && <div>
          {this.state.stage === 1 && <div>Voting isn't open yet</div>}
          {this.state.books && this.state.stage === 2 &&
            <div>
            {
              this.state.books.map((book, index) => (
                <form key={book.title}>
                  <label>
                    {book.title}
                      <select name={book.title} id={book.title} onChange={this.handleRankingChange}>
                        {
                          this.state.books.map((book, index) => (
                            <option value={index + 1}>{index + 1}</option>
                          ))
                        }
                      </select>
                  </label>
                </form>
              ))
            }
            <SubmitRankings 
              handleUserNameChange={this.handleUserNameChange}
              handleRankingsSubmission={this.handleRankingsSubmission}
              duplicateRankings={this.state.duplicateRankings}
              canUserVote={this.state.canUserVote}
            />
            
          </div>}
        </div>
        }
      </div>
    )
  }
}

export default VotingPage;




