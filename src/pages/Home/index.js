import React, { Component } from 'react';
import TopMenu from '../../components/TopMenu';
import TaskBlock from '../../components/TaskBlock';
import MainContent from '../../components/MainContent';
import Footer from '../../components/Footer';
import CardList from '../../components/CardList';
import database from '../../services/firebase';

class HomePage extends Component {
  state = {
    wordArr: [],
  }

  componentDidMount() {
    database.ref('/cards/').once('value').then(res => {
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
      this.setState({
        wordArr: res.val(),
      });
    });
  }

  handleDeletedItem = (id) => {
    console.log(id)
    database.ref('/cards/' + id).remove();
    database.ref('/cards/').once('value').then(res => {
      this.setState({
        wordArr: res.val(),
      });
    });
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

export default HomePage;