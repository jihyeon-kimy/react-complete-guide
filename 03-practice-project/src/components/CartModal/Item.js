import React, { useContext } from "react";
import ProductAmountContext from "../store/product-amount-context";

import classes from "./Item.module.css";

const Item = ({ product, lastProductId }) => {
  const productCtx = useContext(ProductAmountContext);
  return (
    <li
      className={`${classes.item} ${
        product.id === lastProductId && classes["item--border-none"]
      }`}>
      <div className={classes["item-desc"]}>
        <h3>{product.name}</h3>
        <span className={classes["item-desc__price"]}>${product.price}</span>
        <span className={classes["item-desc__amount"]}>x{product.amount}</span>
      </div>
      <div className={classes["item-buttons"]}>
        <button
          onClick={() => {
            productCtx.minusToCart(product.id);
          }}>
          -
        </button>
        <button
          onClick={() => {
            productCtx.plusToCart(product.id);
          }}>
          +
        </button>
      </div>
    </li>
  );
};

export default Item;
