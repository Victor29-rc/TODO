import { useState } from 'react';

const useInput = (validationF, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [isInputTouched, setIsInputTouched] = useState(false);

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsInputTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsInputTouched(false);
  };

  let isValueValid = validationF(value);

  return {
    value,
    isInputTouched,
    isValueValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
