import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault(); // 브라우저가 자동으로 페이지를 로드하는 것을 막기 위해

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    // 유효성 검사
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber); // 추가하려는 데이터는 입력된 수량 이외에도 더 많은 정보를 필요로하기 때문에, 여기서 context 메소드를 호출하지 않고 props로 한단계 위로 올린다(해당 항목의 id, 이름, 가격 등의 정보와 합치기 필요함).
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        // Input은 사용자 지정 컴포넌트라 기본 속성으로 ref를 가지고 있지 않다. Input컴포넌트 에 가서 React.forwardRef롤 컴포넌트를 감싸, React.forwardRef의 인수로 만들어 준 후, props의 두번째 인수로 ref를 설정해주어야 한다.
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          tupe: "number",
          min: "1",
          amx: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
};

export default MealItemForm;

// 인풋을 감싸서 별도의 컴포넌트로 만들 거다. 이 인풋을 재사용할 수 있도록.
