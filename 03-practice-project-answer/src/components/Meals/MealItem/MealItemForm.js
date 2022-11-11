import React from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      <Input
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
    </form>
  );
};

export default MealItemForm;

// 인풋을 감싸서 별도의 컴포넌트로 만들 거다. 이 인풋을 재사용할 수 있도록.
