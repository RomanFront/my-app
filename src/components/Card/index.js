import React from 'react';
import s from './Card.module.css'

class Card extends React.Component {

    handleCardClick = () => {
        console.log('####: it\'s mean', this.props.rus)
    }

    render() {
        const {eng, rus} = this.props;

        return (
            <div 
                className={s.card}
                onClick={this.handleCardClick}
                >
            <div className={s.card}>
                <div className={s.cardInner}>
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