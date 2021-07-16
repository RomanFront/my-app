import React from 'react';
import s from './TopMenu.module.css'
import homeImage from './home_2.svg'

const TopMenu = () => {
    return (
        <div className={s.topMenuContainer}>
            <div className={s.topMenuWrapper}>
                <div className={s.logo}>
                    <img src={homeImage} alt=''/>
                </div>
                <div className={s.menu}>
                    <a href='#'>Мой прогресс</a>
                    <a href='#'>Курсы</a>
                    <a href='#'>Преподаватели</a>
                    <a href='#'>Контакты</a>
                </div>
            </div>
        </div>
    )
}

export default TopMenu;