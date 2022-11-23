import { useSelector, useDispatch } from "react-redux";

import { counterActions } from "../store";
import classes from "./Counter.module.css";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const show = useSelector((state) => state.showCounter); // 리덕스 데이터가 업데이트될 때마다, 컴포넌트가 재평가된다.

  const incrementHandler = () => {
    dispatch(counterActions.increment());
    // counterActions는 리듀서 메서드 이름들을 key로 가진 객체이다. 액션을 전달하려면, 액션 생성자 메서드를 실행하면 된다.
    // 리덕스 ver
    // dispatch({ type: "increment" });
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10)); // {type: SOME_UNIQUE_IDENTIFIER, payload: 10} 필드명 payload는 우리가 정하는 것이 아니라 리덕스 툴킷이 기본값으로 사용하는 필드명이다.
    // 리덕스 ver
    // dispatch({ type: "increase", amount: 5 });
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
    // 리덕스 ver
    // dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
    // 리덕스 ver
    // dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && (
        <>
          <div className={classes.value}>{counter}</div>
          <div>
            <button onClick={incrementHandler}>Increment</button>
            <button onClick={increaseHandler}>Increment by 5</button>
            <button onClick={decrementHandler}>Decrement</button>
          </div>
        </>
      )}

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
