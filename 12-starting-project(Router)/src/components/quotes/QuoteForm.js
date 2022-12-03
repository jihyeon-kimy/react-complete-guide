import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
    // submitFormHandler 내부에서 setIsEntering을 false로 설정하는 것은 안된다. 이미 늦음.
    // [이 부분은 잘 이해가 가지 않는다] 상태 업데이트는 실제로 탐색 작업을 트리거하기 전에 진행되지 않는다. 왜냐하면 탐색 작업은 Add Quote 상태에서만 트리거 되기 때문이다. 전체가 하나의 동기식 프로세스라서 하나의 함수로 봐야하고, 그래서 탐색을 시도하기 전에는 처리되지 않는다.(그래서 별도의 함수를 사용하는 것)
  };

  const formFocusHandler = () => {
    setIsEntering(true);
    // 사용자가 양식에서 작업하고 있음을 알 수 있다.
    // 사용자가 실수로 이 양식을 떠나려고 할 때 사용자에게 경고를 표시하는 것은 사실 곧바로 라우트 되는 것이라 볼 수 있다. 리액트 라우터에는 이럴 때 사용할 수 있는 특수 컴포넌트가 있다.
    // react-router-dom의 Prompt컴포넌트! 이 컴포넌트는 다른 곳으로 이동할 때 자동으로 그걸 감시하고, 특정 조건이 충족되면 떠나기 전에 경고를 표시해준다.
  };

  return (
    <>
      <Prompt
        when={isEntering}
        message={
          (location) =>
            "Are you sure you want to leave? All your entered data will be lost"
          // 우리가 가고자 하는 페이지에 대한 정보를 담고 있는 위치 객체를 얻기 때문에. 일종의 함수
        }
      />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
