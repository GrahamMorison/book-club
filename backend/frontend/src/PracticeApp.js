import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      users: [],
      usersThatVoted: [],
      stage: undefined
    }
  }

  componentDidMount = async () => {
    const res = await fetch('/voting/6245e4d95f63958c337a0029')
    const data = await res.json()
    if (data) {
      this.setState({
        books: data.books,
        users: data.users,
        usersThatVoted: data.usersThatVoted,
        stage: data.stage
      })
    }
    console.log(this.state.stage)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {!this.state.users ? 'Loading' : this.state.users[0]}
          </p>
          
        </header>
      </div>
    );
  }
}

export default App;
