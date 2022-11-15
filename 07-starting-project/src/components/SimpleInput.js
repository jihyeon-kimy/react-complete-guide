import { useEffect, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // 상수로 변경하여 리팩토링할 수 있다. enteredNameIsValid는 enteredName라는 상태로부터 얻어낼 수 있기 때문이다. enteredName과 enteredNameTouched이 바뀔 때마다 전체 컴포넌트가 다시 실행되기 때문에, enteredNameIsValid는 최신 상태를 반영하게 된다.
  // 처음에 작성했던 if(event.target.value.trim() !== ""){setEnteredNameIsValid(true);} / if(enteredName.trim() === ""){setEnteredNameIsValid(false);} 모두 생략가능
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    // formSubmissionHandler 함수가 컴포넌트가 리랜더링 될 때마다 다시 생성되기 때문에, enteredNameIsValid의 최신값을 가져오기 때문에 아래와 같은 식이 가능하다.
    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName("");
    setEnteredNameTouched(false);
  };

  const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
