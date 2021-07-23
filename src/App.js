import React, { Component } from 'react';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import { Spin } from 'antd';
import s from './App.module.css';
import TestContext from './context/testContext';
import FirebaseContext from './context/firebaseContext';


class App extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    const { auth, setUserUid } = this.context;

    auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged')
      if (user) {
        setUserUid(user.uid);
        this.setState({
          user,
        });
      } else {
        setUserUid(null);
        this.setState({
          user: false,
        });
      }
    });
  }

  handleHomeClick = () => {
    const { auth } = this.context;
    auth.signOut().then(() => {
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
        {user ? (
          <TestContext.Provider value={{uid: user.uid}}>
            <HomePage user={user} onHomeClick={this.handleHomeClick}/>
          </TestContext.Provider>
        ) : <LoginPage />}
      </>
    )
  }
}
App.contextType = FirebaseContext;

export default App;
