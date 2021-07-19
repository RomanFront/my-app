import React, { Component } from 'react';
// import Header from './components/Header';
// import HeaderBlock from './components/HeaderBlock';
// import Paragraph from './components/Paragraph';
import TopMenu from './components/TopMenu';
import TaskBlock from './components/TaskBlock';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import CardList from './components/CardList';

const wordsList = [
  {
    eng: 'between',
    rus: 'между',
    id: 1,
  },
  {
    eng: 'high',
    rus: 'высокий',
    id: 2,
  },
  {
    eng: 'really',
    rus: 'действительно',
    id: 3,
  },
  {
    eng: 'something',
    rus: 'что-нибудь',
    id: 4,
  },
  {
    eng: 'most',
    rus: 'большинство',
    id: 5,
  },
  {
    eng: 'out',
    rus: 'из/вне',
    id: 6,
  },
  {
    eng: 'leave',
    rus: 'покидать',
    id: 7,
  },
]

class App extends Component {
  state = {
    wordArr: wordsList,
  }

  handleDeletedItem = (id) => {
    this.setState(({wordArr}) => {
      const idx = wordArr.findIndex(item => item.id === id);
      const newWordArr = [
        ...wordArr.slice(0, idx),
        ...wordArr.slice(idx + 1)
      ]
      return {
        wordArr: newWordArr,
      }
    })
  }
  handleAddItem = (newWord, isAddDisabled) => {
    if (!isAddDisabled) {
      this.setState(({wordArr}) => {
        const newWordArr = wordArr;
        newWordArr.push(newWord)
        return {
          wordArr: newWordArr,
        }
      })
    } else {
      return
    }
    
  }

  render() {
    const { wordArr } = this.state;
    return (
      <>
        {/* <HeaderBlock>
          <Header>
            Время учить слова онлайн
          </Header>
          <Paragraph>
            Испольуйте карточки для запоминания и пополняйте активный словарный запас.
          </Paragraph>
        </HeaderBlock>
        <CardList 
          onAddItem={this.handleAddItem}
          onDeletedItem={this.handleDeletedItem} 
          item={wordArr}
        />
        <HeaderBlock hideBackground>
          <Header>
            Ещё один заголовок
          </Header>
          <Paragraph>
            Ну здорово же!
          </Paragraph>
        </HeaderBlock> */}
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
