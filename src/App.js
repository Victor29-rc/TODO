import { useState } from 'react';

import Card from './components/UI/Card';
import TodoList from './components/TODO/TodoList';
import Header from './components/HEADER/Header';
import TodoForm from './components/TODO/TodoForm';
import RegisterProvider from './context/register-added-context';

function App() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const openFormHandler = () => {
    setIsFormOpened(true);
  };

  const closeFormHandler = () => {
    setIsFormOpened(false);
  };

  return (
    <div className="App">
      <Header onOpenFormHandler={openFormHandler} />
      <RegisterProvider>
        <>
          <Card
            styles={{
              maxWidth: '80%',
              backgroundColor: 'rgb(149, 25, 160)',
              borderRadius: '8px',
            }}
          >
            <TodoList />
          </Card>
          {isFormOpened && <TodoForm onCloseFormHandler={closeFormHandler} />}
        </>
      </RegisterProvider>
    </div>
  );
}

export default App;
