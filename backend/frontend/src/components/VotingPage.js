import React from 'react';
import RoundListDrawer from './RoundListDrawer';
import VotingRanksList from './VotingRanksList';
import AdminPage from './AdminPage';
import ResultsPage from './ResultsPage';
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import AppBar from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// fixing the drawer to be temporary on small screens and making its own component

const defaultState = {
  duplicateRankings: true,
  voteSubmitted: false,
  canUserVote: false,
  books: [],
  name: '',
  users: [],
  usersThatVoted: [],
  stage: null,
  roundId: null,
  votingRoundSelected: false,
  adminRoundSelected: false,
  alreadyVotedOnSelected: false,
  drawerOpen: false,
  clubName: ''
}

const drawerWidth = 240;

const Page = styled(Box)(({ theme }) => ({
  background: '#f9f9f9',
  width: '100%',
  padding: theme.spacing(3)
}));

const Root = styled(Box)(({ theme }) => ({
  display: 'flex'
}))

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` }
}))

const FakeToolBar = styled(Toolbar)(({ theme }) => ({
  toolbar: theme.mixins.toolbar
}))

class VotingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
  }

  componentDidMount = async () => {
    await this.setState({
      name: this.props.name
    })

    const res = await fetch(`/users/${this.state.name}`);
    const userData = await res.json();
    if (userData.length > 0) {
      this.setState({ userData });
    }    
  }

  handleRankingChange = async (e) => {
    e.preventDefault();
    console.log(e);
    const bookTitle = e.target.name;
    const selectedRanking = e.target.value;
    
    const books = structuredClone(this.state.books) // structured clone allows deep cloning without copying the reference

    books.forEach(book => {
      if (book.title === bookTitle) {
        book.currentUserRank = selectedRanking
      }
    });

    await this.setState(() => ({
      books:  [...books]
    }))

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
    //need to remove round id from user in db to make sure users cant
    //vote more than once

    e.preventDefault();

    const books = structuredClone(this.state.books);
    const id = this.state.roundId;
    const name = this.state.name;
    const newVotingArray = this.state.userData[0].currentVotingRounds.filter(round => round !== id)
    const currentUserData = structuredClone(this.state.userData);
    currentUserData[0].currentVotingRounds = [...newVotingArray];
    currentUserData[0].roundsAlreadyVotedOn.push(id)

    books.forEach((book) => {
      book.totalRank += book.currentUserRank;
      book.currentUserRank = 1;
    })
    
    await this.setState((prevState) => ({
        books: [...books],
        voteSubmitted: true,
        usersThatVoted: [...prevState.usersThatVoted, this.state.name],
        userData: currentUserData
      }))

    await fetch(`/votingRounds/${id}`, {
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

    const userId = this.state.userData[0]._id
    await fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentVotingRounds: [...currentUserData[0].currentVotingRounds],
        roundsAlreadyVotedOn: [...currentUserData[0].roundsAlreadyVotedOn]
      })
    })
    await this.setState({
      ...defaultState
    })
    await this.setState({
      name
    })
  }

  handleAlreadyVotedOnSelection = async (round) => {
    const roundRes = await fetch(`/votingRounds/${round}`);
    const roundData = await roundRes.json();
    console.log(roundData)
    await this.setState({
      books: roundData.books,
      users: roundData.users,
      usersThatVoted: roundData.usersThatVoted,
      stage: roundData.stage,
      roundId: roundData._id,
      adminRoundSelected: false,
      votingRoundSelected: false,
      alreadyVotedOnSelected: true,
      clubName: roundData.clubName,
      drawerOpen: false
    })
  }

  handleVotingRoundSelection = async (round) => {
    const roundRes = await fetch(`/votingRounds/${round}`);
    const roundData = await roundRes.json();

    await this.setState({
      books: roundData.books,
      users: roundData.users,
      usersThatVoted: roundData.usersThatVoted,
      stage: roundData.stage,
      roundId: roundData._id,
      clubName: roundData.clubName,
      adminRoundSelected: false,
      votingRoundSelected: true,
      alreadyVotedOnSelected: false,
      drawerOpen: false
    })
  }

  handleAdminRoundSelection = async (round, userData) => {
    const roundRes = await fetch(`/votingRounds/${round}`);
    const roundData = await roundRes.json();
    console.log(userData)
    await this.setState({
      books: roundData.books,
      users: roundData.users,
      usersThatVoted: roundData.usersThatVoted,
      stage: roundData.stage,
      roundId: roundData._id,
      adminRoundSelected: true,
      votingRoundSelected: false,
      alreadyVotedOnSelected: false,
      userData: userData,
      clubName: roundData.clubName,
      drawerOpen: false
    })
    console.log(this.state)
  }

  handleRemoveBook = (bookToRemove) => {
    this.setState((prevState) => ({
        books: prevState.books.filter((book) => book.title !== bookToRemove)
    }))
  }
  handleRemoveUser = (userToRemove) => {
    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user !== userToRemove)
    }))
  }
  handleBookSubmission = (book) => {
    this.setState((prevState) => ({
      books: prevState.books.concat({
        title: book.title,
        author: book.author,
        totalRank: 0,
        currentUserRank: 1,
        description: book.description,
        googleId: book.googleId,
        thumbnail: book.thumbnail
      })
    }));
  }
  handleBookSearch = (book) => {
    if(!book) {
      return 'Please enter a valid user'
    }
    const bookArr = [];
    this.state.books.forEach(book => bookArr.push(book.title))
    if (bookArr.indexOf(book) > -1) {
      return 'This book was already submitted'
    }
  }
  handleUserSubmission = (user) => {
    
    if(!user) {
      return 'Please enter a valid user'
    } else if (this.state.users.indexOf(user) > -1) {
      return 'This user has already been added'
    }

    this.setState((prevState) => ({
      users: prevState.users.concat([user])
    }));
  }
  handleSubmitRound = async (club) => {
    const clubName = club
    const roundId = this.state.roundId
    const tempBooks = structuredClone(this.state.books)
    tempBooks.forEach(book => book.totalRank = 0)
    await this.setState({ 
      books: tempBooks,
      usersThatVoted: [],
      clubName: clubName
    })
    console.log(this.state)
    await fetch(`/votingRounds/${roundId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    this.state.users.forEach(async (user) => {
      const res = await fetch(`/users/${user}`);
      const userData = await res.json();
      console.log(userData);
      const putTheData = () => {
        
        if (!userData[0].currentVotingRounds.find(element => element === roundId)) {
          fetch(`/users/${userData[0]._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              currentVotingRounds: [...userData[0].currentVotingRounds, roundId]
            })
          })
          console.log('this is finished')
        }
        if (userData[0].roundsAlreadyVotedOn.find(element => element === roundId)) {
          fetch(`/users/${userData[0]._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              roundsAlreadyVotedOn: [...userData[0].roundsAlreadyVotedOn.filter(round => round !== roundId)]
            })
          })
          console.log('this is finished')
        }
      }
      await putTheData();
    }) //the app doesn't update correctly to show current voting and already
    // voted on rounds after a round is edited. Need to figure out how to fix
    
    const name = this.state.name;
    await this.setState({
      ...defaultState,
      name
    })
    
    const currentUserData = structuredClone(this.state.userData)
    if (currentUserData[0].currentVotingRounds.filter(round => round === roundId).length < 1) {
      currentUserData[0].currentVotingRounds = [...currentUserData[0].currentVotingRounds, roundId]
    }
    currentUserData[0].roundsAlreadyVotedOn = [...currentUserData[0].roundsAlreadyVotedOn.filter(round => round !== roundId)]

    await this.setState({ userData: currentUserData });
    console.log(this.state)
  }
  handleCreateNewRound = async () => {
    const res = await fetch('/votingRounds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    const userData = structuredClone(this.state.userData)
    console.log(userData)
    userData[0].currentAdminRounds = [...userData[0].currentAdminRounds, data._id]
    userData[0].currentVotingRounds = [...userData[0].currentVotingRounds, data._id]

    await fetch(`/users/${this.state.userData[0]._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currentAdminRounds: [...this.state.userData[0].currentAdminRounds, data._id],
        currentVotingRounds: [...this.state.userData[0].currentVotingRounds, data._id]
      })
    })

    await this.handleAdminRoundSelection(data._id, userData);
    console.log(this.state)

  }

  handleBackButton = async () => {
    const name = this.state.name;
    await this.setState({
      ...defaultState
    })
    await this.setState({
      name
    })
  }

  handleDeleteRound = async () => {
    const roundId = this.state.roundId
    const name = this.state.name;
    const currentUserData = structuredClone(this.state.userData)

    await fetch(`/votingRounds/${roundId}`, {
      method: 'DELETE',
    })

    this.state.users.forEach(async (user) => {
      const res = await fetch(`/users/${user}`);
      const userData = await res.json();
      console.log(userData);
      const deleteTheData = () => {
        fetch(`/users/${userData[0]._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            currentVotingRounds: [...userData[0].currentVotingRounds.filter(round => round !== roundId)],
            currentAdminRounds: [...userData[0].currentAdminRounds.filter(round => round !== roundId)],
            roundsAlreadyVotedOn: [...userData[0].roundsAlreadyVotedOn.filter(round => round !== roundId)]
          })
        })
        console.log('this is finished')
      }
      await deleteTheData();
    })

    
    await this.setState({
      ...defaultState,
      name
    })

    
    currentUserData[0].currentVotingRounds = [...currentUserData[0].currentVotingRounds.filter(round => round !== roundId)]
    currentUserData[0].currentAdminRounds = [...currentUserData[0].currentAdminRounds.filter(round => round !== roundId)]
    currentUserData[0].roundsAlreadyVotedOn = [...currentUserData[0].roundsAlreadyVotedOn.filter(round => round !== roundId)]
    await this.setState({ userData: currentUserData });
  }

  handleOpenDrawer = async () => {
    await this.setState({
      drawerOpen: true
    })
  }

  handleCloseDrawer = async () => {
    await this.setState({
      drawerOpen: false
    })
  }
  render() {
    return (
      <Root>
        <CustomAppBar
          elevation={0}
          color='secondary'
        >
          <Toolbar>
            <IconButton
              color="inherit"
              sx={{ mr: 2, display: { sm: 'none' } }}
              onClick={this.handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{flexGrow: 1, display: { xs: 'none', sm: 'block'}}}
              color="inherit"
              paddingLeft={30}
            >
              {this.state.clubName}
            </Typography>
            <Typography
              sx={{flexGrow: 1, display: { xs: 'block', sm: 'none'}}}
              color="inherit"
            >
              {this.state.clubName}
            </Typography>
            <Typography paddingRight={3}>
              {this.state.name}
            </Typography>
            <Button variant="contained" onClick={this.props.handleLogout}>Logout</Button>
            
          </Toolbar>
        </CustomAppBar>

        {this.state.userData && <RoundListDrawer 
          handleCreateNewRound={this.handleCreateNewRound}
          currentVotingRounds={this.state.userData[0].currentVotingRounds}
          handleVotingRoundSelection={this.handleVotingRoundSelection}
          userData={this.state.userData}
          currentAdminRounds={this.state.userData[0].currentAdminRounds}
          handleAdminRoundSelection={this.handleAdminRoundSelection}
          roundsAlreadyVotedOn={this.state.userData[0].roundsAlreadyVotedOn}
          handleAlreadyVotedOnSelection={this.handleAlreadyVotedOnSelection}
          drawerOpen={this.state.drawerOpen}
          handleCloseDrawer={this.handleCloseDrawer}
        />}

        <Page>
        <FakeToolBar />
        {
          this.state.votingRoundSelected || 
          this.state.adminRoundSelected ||
          this.state.alreadyVotedOnSelected ? 
            <div>
              {
                this.state.votingRoundSelected ?
                  <VotingRanksList 
                    books={this.state.books}
                    handleRankingChange={this.handleRankingChange}
                    handleRankingsSubmission={this.handleRankingsSubmission}
                    duplicateRankings={this.state.duplicateRankings}
                    handleBackButton={this.handleBackButton}
                  /> :
                  <div>
                    { 
                      this.state.adminRoundSelected ?
                      <AdminPage 
                        roundId={this.state.roundId}
                        stage={this.state.stage}
                        books={this.state.books}
                        users={this.state.users}
                        clubName={this.state.clubName}
                        handleBookSubmission={this.handleBookSubmission}
                        handleRemoveBook={this.handleRemoveBook}
                        handleUserSubmission={this.handleUserSubmission}
                        handleRemoveUser={this.handleRemoveUser}
                        handleSubmitRound={this.handleSubmitRound}
                        handleBackButton={this.handleBackButton}
                        handleBookSearch={this.handleBookSearch}
                        handleDeleteRound={this.handleDeleteRound}
                      /> : 
                      <ResultsPage 
                        books={this.state.books}
                        users={this.state.users}
                        usersThatVoted={this.state.usersThatVoted}
                        handleBackButton={this.handleBackButton}
                      />
                    }
                  </div>
              }
            </div> : 
            <Box>
              <Typography padding={2}>
                Welcome to the Book Club Tracker! To create a new round, select the create round option 
                on the top of the menu on the left.
              </Typography>
              <Typography padding={2}>
                To vote, edit or view results for an existing round, please select the round
                under the appropriate header. 
              </Typography>
              <Typography padding={2}>
                Editing an existing round will reset voting and erase any previous submitted votes. If you don't make any changes
                on the edit page, select the back button to keep the existing votes in place.
              </Typography>
            </Box>
        }
        </Page>
      </Root>
    )
  }
}

export default VotingPage;

//error handling for adding more than one user, more than one book, repeating users
//repeating books
//Need to adjust drawer to show club name and smaller round number instead of round Id
//Make users provide more information, email and password
//Email users when they have been added to a new round or when a vote needs to be submitted