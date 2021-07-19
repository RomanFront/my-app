import React, { Component } from 'react';
import s from './CardList.module.css';
import { SwapOutlined, PlusOutlined } from '@ant-design/icons'
import cl from 'classnames';
import Card from '../Card';

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

    handleSubmitForm = (e, newWord) => {
        e.preventDefault();
        this.props.onAddItem(newWord);
        console.log(newWord);
    }

    handleIsSwappedClick = () => {
        this.setState((state) => {
            return {
                isSwapped: !state.isSwapped,
                value: this.state.isSwapped ? this.state.eng_value : this.state.rus_value,
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
                    onSubmit={() => {
                        onAddItem(newWord)
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