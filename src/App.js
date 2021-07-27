import React, { Component } from 'react';
import database from './services/firebase';
import TopMenu from './components/TopMenu';
import TaskBlock from './components/TaskBlock';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import CardList from './components/CardList';

class App extends Component {
  state = {
    wordArr: [],
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
