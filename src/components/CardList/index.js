import React, { Component } from 'react';
import s from './CardList.module.css';
import { SwapOutlined, PlusOutlined } from '@ant-design/icons'
import cl from 'classnames';
import Card from '../Card';
import getTranslateWord from '../../services/yandex-dictionary';

class CardList extends Component {

    state = {
        value: '',
        eng_value: '',
        rus_value: '',
        isSwapped: false,
        isAddDisabled: true,
    }

    handleInputChange = (e) => {        
        if (!this.state.isSwapped) {
            this.setState({
                value: e.target.value,
                eng_value: e.target.value,
            });
        } else {
            this.setState({
                value: e.target.value,
                rus_value: e.target.value,
            });
        }
        if (this.state.eng_value && this.state.rus_value) {
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
        const getWord = await getTranslateWord(this.state.eng_value)
        this.setState((state) => {
            return {
                isSwapped: !state.isSwapped,
                value: state.isSwapped ? state.eng_value : state.rus_value,
                rus_value: state.eng_value ? getWord[0].tr[0].text : state.rus_value,
            }
        });
    }

    render() {
        const {item = [], onDeletedItem, onAddItem} = this.props;
        const newWord = {
            eng: this.state.eng_value,
            rus: this.state.rus_value,
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