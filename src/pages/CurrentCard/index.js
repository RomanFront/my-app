import React, { Component } from 'react';
import { Spin } from 'antd';
import s from './CurrentCard.module.css';
import Title from 'antd/lib/skeleton/Title';
import { withFirebase } from '../../context/firebaseContext'
import Card from '../../components/Card';

class CurrentCard extends Component {
  state = {
    word: {
      id: 0,
      eng: '',
      rus: '',
    }
  }

  componentDidMount() {
    const { firebase, match: {params} } = this.props;
    firebase.getUserCurrentCardRef(params.id).once('value').then(
      res => {
        this.setState({
          word: res.val(),
        });
      }
    )
  }

  render() {
    const { word: { eng, rus } } = this.state;

    if (eng === '' & rus === '') {
      return (
        <div className={s.root}>
          <Spin size="large" />
        </div>
      )
    }
    
    return (
      <div className={s.root}>
        <Title>
          Ваша текущая карточка - { eng }
        </Title>
        <Card eng={eng} rus={rus} noPush/>
      </div>
    )
  }
}

export default withFirebase(CurrentCard);