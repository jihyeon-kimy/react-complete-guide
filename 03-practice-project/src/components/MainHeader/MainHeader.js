import React, { useContext } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import ProductAmountContext from "../store/product-amount-context";

import classes from "./MainHeader.module.css";

const MainHeader = ({ onOpenCartModal }) => {
  const productCtx = useContext(ProductAmountContext);
  let totalCartCount = productCtx.products.reduce((prev, cur) => {
    return (prev += +cur.amount);
  }, 0);

  return (
    <div className={classes["main-header"]}>
      <h1>ReactMeals</h1>
      <button className={classes["main-header__cart-button"]} onClick={onOpenCartModal}>
        <RiShoppingCart2Fill className={classes["main-header__cart-icon"]} />
        <span className={classes["main-header__cart-label"]}>Your Cart</span>
        <span className={classes["main-header__cart-counting"]}>{totalCartCount}</span>
      </button>
    </div>
  );
};

export default MainHeader;
