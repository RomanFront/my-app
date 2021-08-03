import React from 'react';
import s from './Card.module.css';
import cl from 'classnames';
import { CheckSquareOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons'

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
        this.props.onDeleted();
    }
    handlePushClick = () => {
        this.props.onPush();
    }

    render() {
        const { eng, rus, noPush=false } = this.props;
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
            <div 
                className={s.card}
                onClick={this.handleCardClick}
                >
                <div className={ cl(s.cardInner, { [s.done]: done }) }>
                <div className={cardInnerClass.join(' ')}>
            <div className={s.card}>
                <div className={s.cardInner}>
                    <div className={s.cardFront}>
                        {eng}
                    </div>
                    <div className={s.cardBack}>
                        {rus}
                    </div>
                </div>
                <div className={s.icons}>
                    <CheckSquareOutlined onClick={this.handleIsRememberClick}/>
                </div>
                <div className={s.icons}>
                    <DeleteOutlined onClick={this.handleDeletedClick}/>
                </div>
                {
                    !noPush ?
                    <div className={s.icons}>
                        <ArrowRightOutlined onClick={this.handlePushClick}/>
                    </div>
                    :
                    ''
                }                
            </div>            
        )
    }

}

export default Card;