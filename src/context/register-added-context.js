import React, { useState } from 'react';

export const registerContext = React.createContext({
  registerAdded: false,
  setRegisterAdded: () => {},
});

const RegisterProvider = ({ children }) => {
  const [registerAdded, setRegisterAdded] = useState(false);

  return (
    <registerContext.Provider value={{ registerAdded, setRegisterAdded }}>
      {children}
    </registerContext.Provider>
  );
};

export default RegisterProvider;
