import React, { useContext } from "react";
import Product from "./Product";
import Card from "../UI/Card";

import classes from "./ProductsList.module.css";
import ProductAmountContext from "../store/product-amount-context";

const ProductsList = () => {
  const productCtx = useContext(ProductAmountContext);
  const lastProductId = productCtx.products[productCtx.products.length - 1].id;

  return (
    <Card className={classes["products-list"]}>
      <ul className={classes["products-list__inner"]}>
        {productCtx.products.map((product) => {
          return (
            <Product key={product.id} product={product} lastProductId={lastProductId} />
          );
        })}
      </ul>
    </Card>
  );
};

export default ProductsList;
