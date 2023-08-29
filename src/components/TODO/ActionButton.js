import classes from './actionButton.module.css';

const ActionButton = ({ title, onClick }) => {
  return (
    <button className={classes.action_button} onClick={onClick}>
      {title}
    </button>
  );
};

export default ActionButton;
