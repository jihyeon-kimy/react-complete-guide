import { useState } from "react";

const useInput = (checkValidation) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [enteredInputTouched, setEnteredInputTouched] = useState(false);

  const enteredInputIsValid = checkValidation(enteredInput);
  const InputIsInvalid = !enteredInputIsValid && enteredInputTouched;

  const InputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const InputBlurHandler = (event) => {
    setEnteredInputTouched(true);
  };

  const InputClasses = InputIsInvalid ? "form-control invalid" : "form-control";

  return {
    InputChangeHandler,
    InputBlurHandler,
    InputClasses,
    enteredInput,
    enteredInputIsValid,
    InputIsInvalid,
    setEnteredInput,
    setEnteredInputTouched,
  };
};

export default useInput;
