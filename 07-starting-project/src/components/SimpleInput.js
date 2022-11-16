import useInput from "../hooks/use-input";
import Input from "./Input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");
  // 여기서 인라인함수로 정의만 되고 실행되지 않으며, useInput에 입력된다.
  // 이는 validateValue 매개변수로 전해지고, 여기서 정의된 이 함수가 실제로 호출된 곳에서 실행된다.

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError ? "form-control invalid" : "form-control";

  const emailInputClasses = emailInputHasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <Input
        className={nameInputClasses}
        id="name"
        label="Your Name"
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={enteredName}
        inputIsInvalid={nameInputHasError}
        errorText="Name must not be empty"
      />
      <Input
        className={emailInputClasses}
        id="email"
        label="Your Email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={enteredEmail}
        inputIsInvalid={emailInputHasError}
        errorText="Name must include @"
      />
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
