import React from 'react';
import Header from './components/Header';
import HeaderBlock from './components/HeaderBlock';
import Paragraph from './components/Paragraph';
import Card from './components/Card';

const wordsList = [
  {
    eng: 'between',
    rus: 'между',
  },
  {
    eng: 'high',
    rus: 'высокий',
  },
  {
    eng: 'really',
    rus: 'действительно',
  },
  {
    eng: 'something',
    rus: 'что-нибудь',
  },
  {
    eng: 'most',
    rus: 'большинство',
  },
  {
    eng: 'out',
    rus: 'из/вне',
  },
  {
    eng: 'leave',
    rus: 'покидать',
  },
]

const App = () => {
  return (
    <>
      <HeaderBlock>
        <Header>
          Время учить слова онлайн
        </Header>
        <Paragraph>
          Испольуйте карточки для запоминания и пополняйте активный словарный запас.
        </Paragraph>
      </HeaderBlock>
      <div>
        {
          wordsList.map(({ eng, rus}) => <Card eng={eng} rus={rus} />)
        }
      </div>
      <HeaderBlock hideBackground>
        <Header>
          Ещё один заголовок
        </Header>
        <Paragraph>
          Ну здорово же!
        </Paragraph>
      </HeaderBlock>
    </>
  )
}

export default App;
