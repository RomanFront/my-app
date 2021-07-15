import React from 'react';
import Header from './components/Header';
import HeaderBlock from './components/HeaderBlock';
import Paragraph from './components/Paragraph';

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
