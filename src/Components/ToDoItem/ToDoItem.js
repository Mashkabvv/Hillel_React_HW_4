import React from 'react';
import styles from './ToDoItem.module.css'

function ToDoItem({todoItem, onDelete, onEdit, markTodoDone}) {
    
    let classNames = `${styles.item_wrap}`;
    if (todoItem.isDone) {
        classNames = `${styles.item_wrap} ${styles.item_wrap_done}`
    }
    
    return (
        <div className = { classNames } onClick = { () => markTodoDone(todoItem) }>
            <div className = { styles.item_title }>{ todoItem.title }</div>
            <div className = { styles.btn_wrap }>
                <button className = { styles.item_btn } onClick={ (e) => onEdit(todoItem, e) }>Edit</button>
                <button className = { styles.item_btn } onClick={ (e) => onDelete(todoItem.id, e) }>Del</button>
            </div>
        </div>
    );
}

export default ToDoItem;
