import React from 'react';
import s from './Header.module.css'

const Header = ({children}) => {
    return <h1 className={s.header}>{children}</h1>
}

export default Header;