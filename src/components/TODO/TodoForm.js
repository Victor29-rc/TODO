import Modal from '../UI/Modal';
import useInput from '../../hooks/use-input';
import sendHttpRequest from '../../helpers/httpRequests';
import { registerContext } from '../../context/register-added-context';
import { useContext } from 'react';

const isInputValid = (value) => {
  return value.trim().length > 0;
};

const TodoForm = ({ onCloseFormHandler, todo }) => {
  let initialTitle = '';
  let initialDescription = '';
  let todoFormTitle = 'ADD TODO';
  let todoSubmitBtnTitle = 'Add';

  if (todo) {
    initialTitle = todo.title;
    initialDescription = todo.description;
    todoFormTitle = 'EDIT TODO';
    todoSubmitBtnTitle = 'Update';
  }

  const {
    value: title,
    isInputTouched: isInputTitleTouched,
    isValueValid: isTitleValid,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: resetTitleInput,
  } = useInput(isInputValid, initialTitle);

  const {
    value: description,
    isInputTouched: isInputDescriptionTouched,
    isValueValid: isDescriptionValid,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: resetDescriptionInput,
  } = useInput(isInputValid, initialDescription);

  const ctx = useContext(registerContext);

  const titleClassName =
    !isTitleValid && isInputTitleTouched
      ? 'form-control invalid'
      : 'form-control';

  const descriptionClassName =
    !isDescriptionValid && isInputDescriptionTouched
      ? 'form-control invalid'
      : 'form-control';

  const titleInputError = !isTitleValid && isInputTitleTouched && (
    <p className="error">The field can not be empty</p>
  );

  const descriptionTitleError = !isDescriptionValid &&
    isInputDescriptionTouched && (
      <p className="error">The field can not be empty</p>
    );

  const isFormValid = isTitleValid && isDescriptionValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (isFormValid) {
      const newTodo = {
        title,
        description,
      };

      let url = 'https://todos-96914-default-rtdb.firebaseio.com/todos/.json';
      let init = {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (todo) {
        url = `https://todos-96914-default-rtdb.firebaseio.com/todos/${todo.id}/.json`;
        init = {
          method: 'PUT',
          body: JSON.stringify(newTodo),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      }

      sendHttpRequest(url, () => {}, init).then((response) => {
        if (!response.error) {
          resetTitleInput();
          resetDescriptionInput();
          onCloseFormHandler();
          ctx.setRegisterAdded((prevState) => !prevState);
        } else {
          //manage errors
        }
      });
    }
  };

  return (
    <Modal>
      <div className="form-header-section">
        <h4>{todoFormTitle}</h4>
      </div>
      <form className="todo_form" onSubmit={submitHandler}>
        <div className={titleClassName}>
          <label htmlFor="title">To do</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={titleChangeHandler}
            onBlur={titleInputBlurHandler}
          ></input>
          {titleInputError}
        </div>

        <div className={descriptionClassName}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={'10'}
            value={description}
            onChange={descriptionChangeHandler}
            onBlur={descriptionInputBlurHandler}
          ></textarea>
          {descriptionTitleError}
        </div>
        <div className="form-actions">
          <input type="button" value="Cancel" onClick={onCloseFormHandler} />
          <input
            type="submit"
            value={todoSubmitBtnTitle}
            className={!isFormValid ? 'disabled' : ''}
            disabled={!isFormValid ? 'disabled' : false}
          />
        </div>
      </form>
    </Modal>
  );
};

export default TodoForm;
