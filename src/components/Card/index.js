import React from 'react';
import s from './Card.module.css';
import cl from 'classnames';
import { CheckSquareOutlined, DeleteOutlined } from '@ant-design/icons'

class Card extends React.Component {

    state = {
        done: false,
        isRemembered: false,
    }

    handleCardClick = () => {
        this.setState({
            done: !this.state.done,
        })
    }

    handleIsRememberClick = () => {
        this.setState((state) => {
            return {
                isRemembered: !state.isRemembered
            }
        })
    }

    handleDeletedClick = () => {
        console.log('####: 1 level');
        this.props.onDeleted();
    }

    render() {
        const { eng, rus } = this.props;
        const { done } = this.state;

        return (
            <div className={s.root}>
                <div 
                    className={s.card}
                    onClick={this.handleCardClick}
                    >
                    <div className={ cl(s.cardInner, { 
                        [s.done]: done,
                        [s.isRemembered]: this.state.isRemembered,
                     }) }>
                        <div className={s.cardFront}>
                            {eng}
                        </div>
                        <div className={s.cardBack}>
                            {rus}
                        </div>
                    </div>
                </div>
                <div className={s.icons}>
                    <CheckSquareOutlined onClick={this.handleIsRememberClick}/>
                </div>
                <div className={s.icons}>
                    <DeleteOutlined onClick={this.handleDeletedClick}/>
                </div>
            </div>
            
        )
    }

}

export default Card;