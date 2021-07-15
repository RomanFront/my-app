import React from 'react';
import ReactDOM from 'react-dom';
import HeaderBlock from './components/HeaderBlock';
import './index.css';

const AppList = () => {
  const items = ['item 1', 'item 2', 'item 3', 'item 4'];

  return (
    <ul>
      { items.map(item => <li>{item}</li>) }
      <li>{ items[0] }</li>
      <li>{ items[1] }</li>
    </ul>
  )
}

const AppHeader = () => {
  return (
    <h1 className='header'>My header</h1>
  )
}

const AppInput = () => {
  const placeholder = 'Type text...';

  return (
    <label htmlFor='search'>
      <input id='search' placeholder={placeholder} />
    </label>
  )
}

const App = () => {
  return (
    <>
      <HeaderBlock />
      <AppHeader />
      <AppInput />
      <AppList />
      <AppHeader />
      <AppList />
    </>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))