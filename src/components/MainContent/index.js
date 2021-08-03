import React, { useState } from 'react';
import s from './MainContent.module.css'
import { SwapOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'


const MainContent = ({children}) => {
    const [colorHue, setColorHue] = useState(0);

    return (
        <div className={s.mainContent}>
            <div className={s.text}>
                <p style={{filter: `hue-rotate(${colorHue}deg)`}} onClick={() => setColorHue(colorHue + 30)}>
                    Собственный хук: выдели текст несколько раз и заметишь, как меняется цвет.
                    <br />
                    <br />
                    Чтобы выйти из пользователя, нажми на иконку дома в шапке сайта.
                    <br />
                    <br />
                    Нажимая на иконку "<SwapOutlined />" 
                    происходит отправка введенного слова на 
                    перевод.
                    <br />
                    <br />
                    Нажимая на иконку "<PlusOutlined />" 
                    происходит добавление карточки в базу данных. Нажать можно только после перевода.
                    <br />
                    <br />
                    Нажимая на иконку "<DeleteOutlined />" 
                    происходит безвозвратное удаление карточки из базы данных.
                    <br />
                    <br />
                    "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud 
                    exercitation ullamco laboris nisi ut 
                    aliquip ex ea commodo consequat. Duis 
                    aute irure dolor in reprehenderit in 
                    voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint 
                    occaecat cupidatat non proident, sunt 
                    in culpa qui officia deserunt mollit 
                    anim id est laborum."
                </p>
            </div>
            {children}
        </div>
    )
}

export default MainContent;