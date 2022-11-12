import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;

// 요소에서 전개연산자 사용법
// prop.input 객체에 있는 모든 키-값 쌍을 스프레드 문법으로 전개시켜주면, {type:'text'} => type='text 형태로 작동한다
