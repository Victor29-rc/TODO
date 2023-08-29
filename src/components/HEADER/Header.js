import ActionButton from '../TODO/ActionButton';
import classes from './header.module.css';

const Header = ({ onOpenFormHandler }) => {
  return (
    <header className={classes.header}>
      <h1>TODO LIST</h1>
      <ActionButton title={'Add'} onClick={onOpenFormHandler} />
    </header>
  );
};

export default Header;
