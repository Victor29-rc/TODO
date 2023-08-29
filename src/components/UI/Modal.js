import React from 'react-dom';

const Main = ({ children }) => {
  return <div className="modal-content">{children}</div>;
};

const BackDrop = ({ onClick }) => {
  return <div onClick={onClick} className="modal-backdrop"></div>;
};

const Modal = ({ children, onClickBackDrop }) => {
  return (
    <>
      {React.createPortal(
        <Main>{children}</Main>,
        document.getElementById('modal-container')
      )}
      {React.createPortal(
        <BackDrop onClick={onClickBackDrop} />,
        document.getElementById('modal-backdrop')
      )}
    </>
  );
};

export default Modal;
