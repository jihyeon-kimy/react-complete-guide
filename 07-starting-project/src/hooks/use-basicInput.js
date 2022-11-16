import { useReducer, useState } from "react";

const initalInputState = { enteredValue: "", isClicked: false };

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { enteredValue: action.value, isClicked: state.isClicked };
    // isClicked는 true로 바꾸지 않는다. 왜냐하면 true로 바꾸면 사용자가 입력을 마쳐야만 에러메시지를 보여주도록 설계한 방식을 모두 바꿔야 한다.
  }
  if (action.type === "BLUR") {
    return { enteredValue: state.enteredValue, isClicked: true };
  }
  if (action.type === "RESET") {
    return { enteredValue: "", isClicked: false };
  }
  return initalInputState;
};

const useBasicInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initalInputState);

  const valueIsValid = validateValue(inputState.enteredValue);
  const inputHasError = inputState.isClicked && !valueIsValid;

  const changeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const blurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    enteredValue: inputState.enteredValue,
    valueIsValid,
    inputHasError,
    changeHandler,
    blurHandler,
    reset,
  };
};

export default useBasicInput;
