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
import { connect } from 'react-redux';
import * as actions from './actions';
import { bindActionCreators } from 'redux';


class App extends Component {
  componentDidMount() {
    const { auth, setUserUid } = this.props.firebase;
    const { addUserAction } = this.props;

    auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged')
      if (user) {
        setUserUid(user.uid);
        localStorage.setItem('user', JSON.stringify(user.uid));
        addUserAction(user);
      } else {
        setUserUid(null);
        localStorage.removeItem('user');
      }
    });
  }

  handleHomeClick = () => {
    const { removeUserAction } = this.props;
    const { auth } = this.props.firebase;
    auth.signOut().then(() => {
      removeUserAction();
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { userUid } = this.props;
    console.log(this.props);
    
    if (userUid === null) {
      return (
        <div className={s.loader_wrap}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <>
        <BrowserRouter>
          <Route path='/' exact component={LoginPage}/>
          <PrivateRoute path='/home' component={() => <HomePage userUid={userUid} onHomeClick={this.handleHomeClick}/>}/>
          <PrivateRoute path='/word/:id' component={CurrentCard}/>
        </BrowserRouter>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      userUid: state.user.userUid,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(App));
