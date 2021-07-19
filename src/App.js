import React from 'react';
import HeaderBlock from './components/HeaderBlock';

const App = () => {
  return (
    <>
      <HeaderBlock 
        title='Учите слова онлайн' 
        descr='Испольуйте карточки для запоминания и пополняйте активный словарный запас.'
      />
      <HeaderBlock 
        title='Нам нравится это' 
        hideBackground
      />
    </>
  )
}

export default App;
