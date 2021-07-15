import React from 'react';
import s from './HeaderBlock.module.css'

const HeaderBlock = ({ hideBackground = false, children}) => {
    const styleCover = hideBackground ? {backgroundImage: 'none'} : {};
    return (
        <div className={s.cover} style={styleCover}>
            <div className={s.wrap}>
                {children}
            </div>
        </div>
    )
}

export default HeaderBlock;