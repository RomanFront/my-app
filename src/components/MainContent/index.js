import React from 'react';
import s from './MainContent.module.css'

const MainContent = ({children}) => {
    return (
        <div className={s.mainContent}>
            <div className={s.text}>
                <p>
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