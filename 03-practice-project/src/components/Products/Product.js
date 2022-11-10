import React, { useContext } from "react";
import ProductAmountContext from "../store/product-amount-context";
import Button from "../UI/Button";

import classes from "./Product.module.css";

const Product = ({ product, lastProductId }) => {
  const productCtx = useContext(ProductAmountContext);
  return (
    <li
      className={`${classes.product} ${
        product.id === lastProductId && classes["product--border-none"]
      }`}>
      <div>
        <h3 className={classes["product__name"]}>{product.name}</h3>
        <span className={classes["product__desc"]}>{product.desc}</span>
        <span className={classes["product__price"]}>${product.price}</span>
      </div>
      <div>
        <label htmlFor="amount" className={classes["product__amount-label"]}>
          Amount
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="1"
          value={product.amount}
          onChange={(e) => {
            productCtx.changeAmount(product.id, e.target.value);
          }}
          className={classes["product__amount"]}
        />
        <Button
          className={classes["product__button"]}
          onClick={() => {
            productCtx.plusToCart(product.id);
          }}>
          +Add
        </Button>
      </div>
    </li>
  );
};

export default Product;
