import React, { useState } from "react";

const ProductAmountContext = React.createContext({
  products: [],
  plusToCart: (id) => {},
  minusToCart: (id) => {},
  changeAmount: (id, amount) => {},
});

let PROUDCTS_DATA = [
  { id: "p1", name: "Sushi", desc: "Finest fish and veggies", price: 22.99, amount: 1 },
  {
    id: "p2",
    name: "Schnitzel",
    desc: "Finest fish and veggies",
    price: 22.99,
    amount: 1,
  },
  {
    id: "p3",
    name: "Barbecue Burger",
    desc: "Finest fish and veggies",
    price: 22.99,
    amount: 1,
  },
];

export const ProductAmountContextProvider = (props) => {
  const [products, setProducts] = useState(PROUDCTS_DATA);

  const amountChangeHandler = (id, amount) => {
    setProducts((prev) => {
      let updatedArray = prev.map((product) => {
        if (product.id !== id) {
          return product;
        }

        if (+amount >= 0) {
          return { ...product, amount: amount };
        } else {
          return { ...product, amount: 0 };
        }
      });
      return updatedArray;
    });
  };

  const plusToCartHandler = (id) => {
    setProducts((prev) => {
      let updatedArray = prev.map((product) => {
        if (product.id !== id) {
          return product;
        }
        return { ...product, amount: product.amount + 1 };
      });
      return updatedArray;
    });
  };

  const minusToCartHandler = (id) => {
    setProducts((prev) => {
      let updatedArray = prev.map((product) => {
        if (product.id !== id) {
          return product;
        }
        return { ...product, amount: product.amount - 1 };
      });
      return updatedArray;
    });
  };

  return (
    <ProductAmountContext.Provider
      value={{
        products: products,
        plusToCart: plusToCartHandler,
        minusToCart: minusToCartHandler,
        changeAmount: amountChangeHandler,
      }}>
      {props.children}
    </ProductAmountContext.Provider>
  );
};

export default ProductAmountContext;
