import Modal from '../UI/Modal';

const ShowTodo = ({ todo, onCloseTodoView }) => {
  return (
    <Modal onClickBackDrop={onCloseTodoView}>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </Modal>
  );
};

export default ShowTodo;
