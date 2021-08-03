import React, { Component } from 'react';
import s from './App.module.css';
import { Spin } from 'antd';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CurrentCard from './pages/CurrentCard';
import { withFirebase } from './context/firebaseContext';
import { Route } from 'react-router-dom'
import { PrivateRoute } from './utils/privateRoute';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    const { auth, setUserUid } = this.props.firebase;

    auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged')
      if (user) {
        setUserUid(user.uid);
        localStorage.setItem('user', JSON.stringify(user.uid));
        this.setState({
          user,
        });
      } else {
        setUserUid(null);
        localStorage.removeItem('user');
        this.setState({
          user: false,
        });
      }
    });
  }

  handleHomeClick = () => {
    const { auth } = this.props.firebase;
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
        <BrowserRouter>
          <Route path='/' exact component={LoginPage}/>
          <PrivateRoute path='/home' component={() => <HomePage user={user} onHomeClick={this.handleHomeClick}/>}/>
          <PrivateRoute path='/word/:id' component={CurrentCard}/>
        </BrowserRouter>
      </>
    )
  }
}

export default withFirebase(App);
