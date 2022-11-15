import { useEffect, useRef, useState } from "react";

// 브라우저에서 이루어지는 유효성 검증은 사용자 경험을 위한 장치일 뿐, 보안 매커니즘 같은 것이 아니다.
// 사용자 경험 측면에서 빠른 반응을 할 수 있어서 좋지만, 브라우저에 있는 코드는 사용자에 의해 편집될 수 있다. 콘솔만 열어서 간단히 가능한 상황. 그래서 이러한 입력값은 결국 서버에서 검증되어야 한다.

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");

  // enteredNameTouched를 함께 확인하는 이유
  // 에러메시지를 띄울 때, 지금의 경우는 enteredNameIsValid의 초기값을 true로 해서 사용할 수도 있다. 의미상 맞지 않아서 불편하지만 실질적으로는 문제가 되지 않음.
  // 하지만 앱의 기능을 확장하여, enteredNameIsValid가 변할 때 무언가가 작동되게(useEffect) 하고자 하는 경우에 문제가 된다. 초기에 true이면 기대하지 않은 시점에 실행이 된다.
  // 그래서 유효성 에러메시지를 유저에게 띄우기 위한 처리를 하고자 하는 경우, enteredNameIsValid와 enteredNameTouched를 확인하여 띄워준다.
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is valid!");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true); // 여기서는 submit버튼을 누른 시점에 모든 내용을 확인한 것으로 간주하고 true로 바꿔준다.

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    // 입력값을 추적해서 제출에 사용하는 방법과 ref를 사용하는 방법이 있다.
    // 즉각적인 유효성검사가 필요하다면 useState(상태), 폼이 제출되었을 때 한번만 필요하다면 useRef가 적합해 보인다.
    // 입력 후에 값이 초기화해야 하는 경우에는 State를 사용하는 것이 좋다. ref로 초기화할 수 있지만, DOM을 직접 조작해야 하기 때문에 바랍직하지 않다.
    console.log(enteredName);
    setEnteredName("");

    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);
    // nameInputRef.current.value = ""; 좋지 않은 방법. 리액트로만 DOM을 조작해야 한다.
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
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
