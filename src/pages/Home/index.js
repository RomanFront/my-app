import React, { Component } from 'react';
import { Spin } from 'antd';
import TopMenu from '../../components/TopMenu';
import TaskBlock from '../../components/TaskBlock';
import MainContent from '../../components/MainContent';
import Footer from '../../components/Footer';
import CardList from '../../components/CardList';
import { withFirebase } from '../../context/firebaseContext';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCardList } from '../../actions';

class HomePage extends Component {

  urlRequest = `${this.props.userUid}/cards/`

  componentDidMount() {    
    const { getUserCardsRef } = this.props.firebase;
    const { fetchCardList } = this.props;

    fetchCardList(getUserCardsRef);
  }

  setNewWord = (eng_value, rus_value) => {
    const { items } = this.props;
    const { database } = this.props.firebase;

    database.ref(this.urlRequest + items.length).set({
      eng: eng_value,
      rus: rus_value,
      id: items.length,
    });
  }

  handleDeletedItem = (id) => {
    const { database } = this.props.firebase;
    
    database.ref(`/${this.urlRequest}${id}`).remove();
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

    const { items, isBusy } = this.props;
    
    return (
      <>
        <TaskBlock>
          <TopMenu onHomeClick={this.handleHomeClick}/>
          <MainContent>
            {
            isBusy ? 
            <Spin/> 
            :
            <CardList
            onAddItem={this.handleAddItem}
            onDeletedItem={this.handleDeletedItem}
            onPushItem={this.handlePushItem}
            item={items}
            />
            }
          </MainContent>
          <Footer />
        </TaskBlock>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isBusy: state.cardList.isBusy,
    items: state.cardList.payload || [],
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      fetchCardList: fetchCardList,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(HomePage));