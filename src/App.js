import React, { Component } from 'react';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import { fire } from './services/firebase'
import { Spin } from 'antd';
import s from './App.module.css';


class App extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user,
        });
      } else {
        this.setState({
          user: false,
        });
      }
    });
  }

  handleHomeClick = () => {
    fire.auth().signOut().then(() => {
      this.setState({
        user: false,
      });
    }).catch((error) => {
      console.log(error);
    });
    console.log(this.state)
  }

  render() {
    const { user } = this.state;
    
    if (user === null) {
      return (
        <div className={s.loader_wrap}>
          <Spin size="large" />
        </div>
      );
    }

    console.log(this.state);

    return (
      <>
        {user ? <HomePage user={user} onHomeClick={this.handleHomeClick}/> : <LoginPage />}
      </>
    )
  }
}

export default App;
