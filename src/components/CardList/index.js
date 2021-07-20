import React, { Component } from 'react';
import s from './CardList.module.css';
import { SwapOutlined, PlusOutlined } from '@ant-design/icons'
import cl from 'classnames';
import Card from '../Card';
import getTranslateWord from '../../services/yandex-dictionary';

let engValue = '';
let rusValue = '';
let isSwapped = false;

class CardList extends Component {


    state = {
        value: '',
        eng_value: '',
        rus_value: '',
        isAddDisabled: true,
        isSwapped: false,
    }

    handleInputChange = (e) => {        
        if (!isSwapped) {
            this.setState({
                value: e.target.value,
                eng_value: e.target.value,
            });
            engValue = e.target.value;
        } else {
            this.setState({
                value: e.target.value,
                rus_value: e.target.value,
            });
            rusValue = e.target.value;
        }
        if (engValue && rusValue) {
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
        const getWord = await getTranslateWord(engValue)
        isSwapped = !isSwapped;
        if (engValue) {
            rusValue = getWord[0].tr[0].text;
            this.setState(() => {
                return {
                    isAddDisabled: false,
                }
            });
        }        
        this.setState((state) => {
            return {
                isSwapped: !state.isSwapped,
                value: isSwapped ? rusValue : engValue,
                rus_value: rusValue,
            }
        });
        
    }

    render() {
        const {item = [], onDeletedItem, onAddItem} = this.props;
        const newWord = {
            eng: engValue,
            rus: rusValue,
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
                        <PlusOutlined onClick={() => {onAddItem(newWord, this.state.isAddDisabled)}} />
                    </div>
                </form>
                <div className={s.root}>
                    {
                        item.map(({ eng, rus, id }) => (
                            <Card 
                            onDeleted={() => {
                                onDeletedItem(id);
                            }}
                            key={id} 
                            eng={eng} 
                            rus={rus} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default CardList;