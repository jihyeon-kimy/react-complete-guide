import React, { useImperativeHandle, useRef } from "react";

import classes from "./Input.module.css";

// 우리가 만든 컴포넌트는 props 객체로 ref 프롭을 받아들이지 않는다.
// 그래서 React.forwardRef((props, ref) 해준거임. ref를 활성화
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  // activate 함수를 컴포넌트 외부에서 호출하고자 함
  // useImperativeHandle : 컴포넌트나 컴포넌트 내부에서 오는 기능들을 명령적으로 사용할 수 있게 해준다. (state 프롭 관리를 통하지 않고, 부모 컴포넌트의 state를 통하지 않고, 프로그래밍적으로 컴포넌트에서 무언가를 직접 호출하거나 조작해서 사용하게 해주는 것)
  useImperativeHandle(ref, () => {
    return { focus: activate }; // 외부에서 사용할 수 있는 모든 데이터 포함 {외부에서 접근할 수 있는 이름 : 데이터}
  });

  return (
    <div
      className={`${classes.control} ${props.isValid === false ? classes.invalid : ""}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onChange}
      />
    </div>
  );
});

export default Input;
