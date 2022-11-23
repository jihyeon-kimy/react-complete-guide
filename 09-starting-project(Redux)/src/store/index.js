// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
      // Redux toolkit과 createSlice 같은 함수를 사용하면, 기존 상태를 바꿀 수 없다. 왜냐하면 Redux toolkit 내부적으로 immer라는 다른 패키지를 사용하는데, 이런 코드를 감지하고 자동으로 원래 있는 상태를 복제하기 때문이다.
      // 새로운 상태 객체를 생성하고, 모든 상태를 변경할 수 없게 유지한다. 변경한 상태는 변하지 않도록 오버라이드 한다. 그래서 redux toolkit으로 더 쉽게 리덕스를 사용할 수 있는 것.
      // 더 이상 불변성을 신경쓸 필요가 없다.
      // 이제 상태를 직접 변경할 수 있다. 내부적으로 알아섯 변환될 테니까.
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// 리덕스 ver
// const counterReducer = (state = initialState, action) => {
//   if (action.type === "increment") {
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter,
//     };
//     // 전체 상태 객체를 리턴해야하니까 showCoounter도 함께 리턴하도록 바꿔주어야 한다.
//     // 리덕스는 기본 상태에 변화된걸 합치지 않는다. 대신 리턴한 것으로 기존 것을 대체한다(덮어쓴다).
//     // 기존 state를 변경해서는 안된다. state.counter++ return state 하면 안된다.
//     // 데이터를 업데이트할 때 기존 객체로 가서 절대 객체 속성이 조작되지 않도록 해야한다. 새로운 객체를 복사하고 생성하자
//   }

//   if (action.type === "increase") {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "decrement") {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter,
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter,
//     };
//   }
//   return state;
// };

// const store = createStore(counterReducer)

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;
export default store;
