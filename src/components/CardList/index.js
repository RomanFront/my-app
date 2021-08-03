import React, { Component } from 'react';
import s from './CardList.module.css';
import { SwapOutlined, PlusOutlined } from '@ant-design/icons'
import cl from 'classnames';
import Card from '../Card';
import { withRouter } from 'react-router-dom';
import getTranslateWord from '../../services/yandex-dictionary';

class CardList extends Component {

    state = {
        value: '',
        eng_value: '',
        rus_value: '',
        isAddDisabled: true,
        isSwapped: false,
    }

    handleInputChange = (e) => {
        let { eng_value, rus_value, isSwapped } = this.state;
        
        if (!isSwapped) {
            this.setState({
                value: e.target.value,
                eng_value: e.target.value,
            });
            eng_value = e.target.value;
        } else {
            this.setState({
                value: e.target.value,
                rus_value: e.target.value,
            });
            rus_value = e.target.value;
        }
        if (eng_value && rus_value) {
            this.setState(() => {
                return {
                    isAddDisabled: false,
                }
            });
        } else {
            this.setState(() => {
                return {
                    isAddDisabled: true,
                }
            });
        }        
    }

    handleIsSwappedClick = async () => {
        let { eng_value, rus_value, isSwapped } = this.state;
        const getWord = await getTranslateWord(eng_value)
        isSwapped = !isSwapped;
        if (eng_value) {
            rus_value = getWord[0].tr[0].text;
            this.setState(() => {
                return {
                    isAddDisabled: false,
                }
            });
        }        
        this.setState((state) => {
            return {
                isSwapped: !state.isSwapped,
                value: isSwapped ? rus_value : eng_value,
                rus_value: rus_value,
            }
        });
        
    }

    handleAddClick = () => {
        let { eng_value, rus_value} = this.state;
        const newWord = {
            eng: eng_value,
            rus: rus_value,
        }
        this.props.onAddItem(newWord, this.state.isAddDisabled)
        this.setState((state) => {
            return {
                isSwapped: !state.isSwapped,
                value: '',
                eng_value: '',
                rus_value: '',
            }
        });
    }

    handlePushClick = (id) => {
        this.props.history.push(`/word/${id}`);
    }

    render() {
        let { eng_value, rus_value } = this.state;
        const {item = [], onDeletedItem, onAddItem} = this.props;
        const newWord = {
            eng: eng_value,
            rus: rus_value,
        }

        return (
            <div>
                <form 
                    className={s.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        onAddItem(newWord, this.state.isAddDisabled)
                    }}
                >
                    <input 
                        className={ cl({[s.isSwapped]: this.state.isSwapped}) }
                        type='text'
                        value={this.state.value}
                        placeholder='Введите слово...'
                        onInput={this.handleInputChange}
                    />
                    <div className={s.icons}>
                        <SwapOutlined onClick={this.handleIsSwappedClick} />
                    </div>
                    <div className={ cl(s.icons, { [s.isDisabled]: this.state.isAddDisabled }) }>
                        <PlusOutlined onClick={this.handleAddClick} />
                    </div>
                </form>
                <div className={s.root}>
                    {
                        item.map(({ eng, rus, id }) => (
                            <Card 
                            onDeleted={() => {
                                onDeletedItem(id);
                            }}
                            onPush={() => {
                                this.handlePushClick(id);
                            }}
                            key={id}
                            eng={eng}
                            rus={rus}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(CardList);