import React, { useEffect, useMemo, useState, useContext } from 'react';
import TodoItem from './TodoItem';
import sendHttpRequest from '../../helpers/httpRequests';
import classes from './todoList.module.css';
import { registerContext } from '../../context/register-added-context';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const ctx = useContext(registerContext);
  const { registerAdded } = ctx;

  const init = useMemo(() => {
    return { method: 'GET' };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    sendHttpRequest(
      'https://todos-96914-default-rtdb.firebaseio.com/.json',
      setTodos,
      init
    ).then((response) => {
      if (response.error) {
        setHasError(true);
      }
      setIsLoading(false);
    });
  }, [init, registerAdded]);

  let content = <p style={{ textAlign: 'center' }}>Loading...</p>;

  if (!isLoading && hasError) {
    content = <p style={{ textAlign: 'center' }}>{'An error has ocurred!'}</p>;
  }

  if (!isLoading && !hasError) {
    const todoList = [];

    for (const key in todos) {
      todoList.push(<TodoItem key={key} todo={{ ...todos[key], id: key }} />);
    }

    content = <ul className={classes.todo_list}>{todoList}</ul>;
  }

  return content;
};

export default React.memo(TodoList);
