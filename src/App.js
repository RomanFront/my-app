import React, { Component } from 'react';
import firebase from 'firebase';
import TopMenu from './components/TopMenu';
import TaskBlock from './components/TaskBlock';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import CardList from './components/CardList';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

class App extends Component {
  state = {
    wordArr: [],
  }

  constructor() {
    super();
  }

  componentDidMount() {
    database.ref('/cards/').once('value').then(res => {
      console.log('####: res', res.val());
      this.setState({
        wordArr: res.val(),
      });
    });
  }

  setNewWord = (eng_value, rus_value) => {
    database.ref('/cards/' + this.state.wordArr.length).set({
      eng: eng_value,
      rus: rus_value,
      id: this.state.wordArr.length,
    });
    database.ref('/cards/').once('value').then(res => {
      console.log('####: res', res.val());
      this.setState({
        wordArr: res.val(),
      });
    });
  }

  handleDeletedItem = (id) => {
    database.ref('/cards/' + id).remove();
    database.ref('/cards/').once('value').then(res => {
      console.log('####: res', res.val());
      this.setState({
        wordArr: res.val(),
      });
    });


    // this.setState(({wordArr}) => {
    //   const idx = wordArr.findIndex(item => item.id === id);
    //   const newWordArr = [
    //     ...wordArr.slice(0, idx),
    //     ...wordArr.slice(idx + 1)
    //   ]
    //   return {
    //     wordArr: newWordArr,
    //   }
    // })
  }
  handleAddItem = (newWord, isAddDisabled) => {
    if (!isAddDisabled) {
      this.setNewWord(newWord.eng, newWord.rus)
    } else {
      return
    }
    
  }

  render() {
    const { wordArr } = this.state;
    return (
      <>
        <TaskBlock>
          <TopMenu />
          <MainContent>
            <CardList
              onAddItem={this.handleAddItem}
              onDeletedItem={this.handleDeletedItem} 
              item={wordArr}
            />
          </MainContent>
          <Footer />
        </TaskBlock>
      </>
    )
  }
}

export default App;
