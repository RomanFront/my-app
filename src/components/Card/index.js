import React from 'react';
import s from './Card.module.css'

class Card extends React.Component {

    state = {
        done: false,
    }

    handleCardClick = () => {
        if (this.state.done) {
            this.setState({
                done: false,
            })
            return
        }
        this.setState({
            done: true,
        })
    }

    render() {
        const { eng, rus } = this.props;
        const { done } = this.state;

        const cardInnerClass = [s.cardInner];
        if (done) {
            cardInnerClass.push(s.done);
        }

        return (
            <div 
                className={s.card}
                onClick={this.handleCardClick}
                >
                <div className={cardInnerClass.join(' ')}>
                    <div className={s.cardFront}>
                        {eng}
                    </div>
                    <div className={s.cardBack}>
                        {rus}
                    </div>
                </div>
            </div>
        )
    }

}

export default Card;