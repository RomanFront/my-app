import React from 'react';
import s from './Card.module.css';
import cl from 'classnames';

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

        return (
            <div 
                className={s.card}
                onClick={this.handleCardClick}
                >
                <div className={ cl(s.cardInner, { [s.done]: done }) }>
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