import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
    // 전체 상태 객체를 리턴해야하니까 showCoounter도 함께 리턴하도록 바꿔주어야 한다.
    // 리덕스는 기본 상태에 변화된걸 합치지 않는다. 대신 리턴한 것으로 기존 것을 대체한다(덮어쓴다).
    // 기존 state를 변경해서는 안된다. state.counter++ return state 하면 안된다.
    // 데이터를 업데이트할 때 기존 객체로 가서 절대 객체 속성이 조작되지 않도록 해야한다. 새로운 객체를 복사하고 생성하자
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
