import React, {useEffect, useState} from 'react';
import api from './services/Api';
import ToDoList from './Components/ToDoList/ToDoList';
import ToDoForm from './Components/ToDoForm/ToDoForm'

function App() {
    
    const [todoData, setTodoData] = useState([]);
    const [formState, setformState] = useState({isFormShown: false});
    const [newTodo, setNewTodo] = useState({title:'', isDone: false});

    useEffect(() => {
        api.get('').then(resp => setTodoData(resp.data))
    }, []);
    
    function toggleFormOpen() {
        setformState({
            isFormShown: !formState.isFormShown
        });
        setNewTodo({title:'', isDone: false})
    }
    
    function onDelete(id, e) {
        e.stopPropagation();
        api.delete(id)
            .then(resp =>
                setTodoData(todoData.filter(item => {return resp.data.id !== item.id})
                ));
    }
    
    function onChangeValue(obj) {
        setNewTodo({...newTodo, ...obj});
    }
    
    function onTodoSave(todo) {
        if (todo.id) {
            updateTodo(todo);
        } else {
            createTodo(todo);
        }
        setformState({
            isFormShown: !formState.isFormShown
        })
    }
    
    function updateTodo(todo) {
        api.put(todo.id, todo).then(resp => setTodoData(todoData.map(item => item.id === resp.data.id ? resp.data : item)))
    }
    
    function createTodo(todo) {
        api.post('', todo).then(resp => setTodoData([...todoData, resp.data]))
    }
    
    function onEdit(editItem, e) {
        e.stopPropagation();
        setNewTodo({...editItem});
        setformState({
            isFormShown: !formState.isFormShown
        });
    }
    
    function markDone(markItem) {
        const editMarkItem = {...markItem, isDone: !markItem.isDone};
        api.put(markItem.id, editMarkItem)
            .then(resp => setTodoData(todoData.map(item => item.id === resp.data.id ? resp.data : item)))
    }
    
  return (
    <div className="App">
      <ToDoList
          formState = { formState }
          todoData = { todoData }
          toggleFormOpen = { toggleFormOpen }
          onDelete = {onDelete}
          onEdit = {onEdit}
          markTodoDone = {markDone}
      />
        {formState.isFormShown ?
            <ToDoForm
                newTodo = {newTodo}
                onChange = {onChangeValue}
                onTodoSave = {onTodoSave}
                toggleFormOpen = {toggleFormOpen}
            /> : null}
    </div>
  );
}

export default App;
