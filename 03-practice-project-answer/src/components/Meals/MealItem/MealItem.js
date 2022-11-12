import React, { useContext } from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`; // 가격을 나타내는 형식 지정. toFixed(2) 소수점 이핳 두 자리 수까지

  // MealItemForm에서 검증된 수량을 매개변수로 가져온다.
  // 그리고 addToCartHandler에서 context 메서드로 항목을 추가한다.
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;

// 수량을 사용자가 입력할 수 있는 폼을 렌더링. > 추가 컴포넌트
