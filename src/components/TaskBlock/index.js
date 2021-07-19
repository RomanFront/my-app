import React from 'react';
import s from './TaskBlock.module.css'


const TaskBlock = ({children}) => {
    return (
        <div className={s.taskContainer}>
            {children}
        </div>
    )
}

export default TaskBlock;