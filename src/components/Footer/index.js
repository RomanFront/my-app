import React from 'react';
import s from './Footer.module.css'

const Footer = () => {
    return (
        <div className={s.footer}>
            <p className={s.text}>
                Copyright 2021 | <a href='#'>Privacy policy</a>
            </p>
        </div>
    )
}

export default Footer;