import { useContext, useState } from 'react';
import ActionButton from './ActionButton';
import classes from './todoItem.module.css';
import ShowTodo from './ShowTodo';
import TodoForm from './TodoForm';
import sendHttpRequest from '../../helpers/httpRequests';

import { registerContext } from '../../context/register-added-context';

const TodoItem = ({ todo }) => {
  const [showTodo, setShowToDo] = useState(false);
  const [editTodo, setEditTodo] = useState(false);

  const openEditTodoHandler = () => setEditTodo(true);
  const closeEditTodoHandler = () => setEditTodo(false);

  const closeTodoViewHandler = () => setShowToDo(false);
  const showTodoViewHandler = () => setShowToDo(true);

  const ctx = useContext(registerContext);

  const deleteTodoHandler = () => {
    const url = `https://todos-96914-default-rtdb.firebaseio.com/todos/${todo.id}/.json`;
    const init = {
      method: 'DELETE',
    };

    sendHttpRequest(url, () => {}, init).then((response) => {
      if (!response.error) {
        ctx.setRegisterAdded((prevState) => !prevState);
      } else {
        //manage errors
      }
    });
  };

  return (
    <li className={classes.todo_item}>
      <div className={classes.todo_info_container}>
        <span className={classes.item_title}>{todo.title}</span>
        <p className={classes.item_description}>{todo.description}</p>
      </div>
      <div className={classes.action_buttons_container}>
        <ActionButton title={'Show'} onClick={showTodoViewHandler} />
        <ActionButton title={'Edit'} onClick={openEditTodoHandler} />
        <ActionButton title={'Delete'} onClick={deleteTodoHandler} />
        {showTodo && (
          <ShowTodo todo={todo} onCloseTodoView={closeTodoViewHandler} />
        )}
        {editTodo && (
          <TodoForm todo={todo} onCloseFormHandler={closeEditTodoHandler} />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
