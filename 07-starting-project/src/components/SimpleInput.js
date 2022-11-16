import useInput from "../hooks/use-input";
import Input from "./Input";

const SimpleInput = (props) => {
  const checkNameValidation = (data) => {
    return data.trim() !== "";
  };

  const checkEmailValidation = (data) => {
    return data.includes("@");
  };

  const {
    InputChangeHandler: nameInputChangeHandler,
    InputBlurHandler: nameInputBlurHandler,
    InputClasses: nameInputClasses,
    enteredInput: enteredName,
    enteredInputIsValid: enteredNameIsValid,
    InputIsInvalid: nameInputIsInvalid,
    setEnteredInput: setEnteredName,
    setEnteredInputTouched: setEnteredNameTouched,
  } = useInput(checkNameValidation);

  const {
    InputChangeHandler: emailInputChangeHandler,
    InputBlurHandler: emailInputBlurHandler,
    InputClasses: emailInputClasses,
    enteredInput: enteredEmail,
    enteredInputIsValid: enteredEmailIsValid,
    InputIsInvalid: emailInputIsInvalid,
    setEnteredInput: setEnteredEmail,
    setEnteredInputTouched: setEnteredEmailTouched,
  } = useInput(checkEmailValidation);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <Input
        className={nameInputClasses}
        id="name"
        label="Your Name"
        onChange={nameInputChangeHandler}
        onBlur={nameInputBlurHandler}
        value={enteredName}
        inputIsInvalid={nameInputIsInvalid}
        errorText="Name must not be empty"
      />
      <Input
        className={emailInputClasses}
        id="email"
        label="Your Email"
        onChange={emailInputChangeHandler}
        onBlur={emailInputBlurHandler}
        value={enteredEmail}
        inputIsInvalid={emailInputIsInvalid}
        errorText="Name must include @"
      />
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
