import React from 'react';
import s from './HeaderBlock.module.css'
import ReactLogoPng from '../../logo.svg'
import { ReactComponent as ReactLogoSvg } from '../../logo.svg';

const HeaderBlock = ({ title, hideBackground = false, descr }) => {
    const styleCover = hideBackground ? {backgroundImage: 'none'} : {};
    return (
        <div className={s.cover} style={styleCover}>
            <div className={s.wrap}>
                {title && <h1 className={s.header}>{title}</h1>}
                <img className={s.first_png} src={ReactLogoPng} alt=''/>
                <ReactLogoSvg />
                {descr && <p className={s.descr}>{descr}</p>}
            </div>
        </div>
    )
}

export default HeaderBlock;