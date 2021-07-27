import React, { Component } from 'react';
import TopMenu from '../../components/TopMenu';
import TaskBlock from '../../components/TaskBlock';
import MainContent from '../../components/MainContent';
import Footer from '../../components/Footer';
import CardList from '../../components/CardList';
import { withFirebase } from '../../context/firebaseContext';

class HomePage extends Component {
  state = {
    wordArr: [],
  }

  urlRequest = `${this.props.user.uid}/cards/`

  componentDidMount() {
    const { getUserCardsRef } = this.props.firebase;
    getUserCardsRef().on('value', res => {
      this.setState({
        wordArr: res.val() || [],
      });
    });
  }

  setNewWord = (eng_value, rus_value) => {
    const { database } = this.props.firebase;
    database.ref(this.urlRequest + this.state.wordArr.length).set({
      eng: eng_value,
      rus: rus_value,
      id: this.state.wordArr.length,
    });
  }

  handleDeletedItem = (id) => {
    const { database } = this.props.firebase;
    const { wordArr } = this.state;
    const newWordArr = wordArr.filter(item => item.id !== id);
    database.ref(this.urlRequest).set(newWordArr);
  }

  // handlePushItem = (id) => {
  //   this.props.history.push(`/word/${id}`);
  // }

  handleAddItem = (newWord, isAddDisabled) => {
    if (!isAddDisabled) {
      this.setNewWord(newWord.eng, newWord.rus)
    } else {
      return
    }
  }

  handleHomeClick = () => {
    this.props.onHomeClick()
  }

  render() {
    const { wordArr } = this.state;
    
    return (
      <>
        <TaskBlock>
          <TopMenu onHomeClick={this.handleHomeClick}/>
          <MainContent>
            <CardList
              onAddItem={this.handleAddItem}
              onDeletedItem={this.handleDeletedItem}
              onPushItem={this.handlePushItem}
              item={wordArr}
            />        
          </MainContent>
          <Footer />
        </TaskBlock>
      </>
    )
  }
}

export default withFirebase(HomePage);