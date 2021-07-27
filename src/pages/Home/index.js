import React, { Component } from 'react';
import TopMenu from '../../components/TopMenu';
import TaskBlock from '../../components/TaskBlock';
import MainContent from '../../components/MainContent';
import Footer from '../../components/Footer';
import CardList from '../../components/CardList';
import TestContext from '../../context/testContext';
import FirebaseContext from '../../context/firebaseContext';

class HomePage extends Component {
  state = {
    wordArr: [],
  }

  urlRequest = `${this.props.user.uid}/cards/`

  componentDidMount() {
    const { getUserCardsRef } = this.context;
    getUserCardsRef().on('value', res => {
      this.setState({
        wordArr: res.val() || [],
      });
    });
  }

  setNewWord = (eng_value, rus_value) => {
    const { database } = this.context;
    database.ref(this.urlRequest + this.state.wordArr.length).set({
      eng: eng_value,
      rus: rus_value,
      id: this.state.wordArr.length,
    });
  }

  handleDeletedItem = (id) => {
    const { database } = this.context;
    const { wordArr } = this.state;
    const newWordArr = wordArr.filter(item => item.id !== id);
    database.ref(this.urlRequest).set(newWordArr);
  }

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
            <TestContext.Consumer>
              {
                (value) => {
                  console.log(value);
                  return (
                    <CardList
                      onAddItem={this.handleAddItem}
                      onDeletedItem={this.handleDeletedItem} 
                      item={wordArr}
                    />
                  )
                }
              }
            </TestContext.Consumer>            
          </MainContent>
          <Footer />
        </TaskBlock>
      </>
    )
  }
}
HomePage.contextType = FirebaseContext;

export default HomePage;