import React from "react";

// 전체 장바구니 데이터는 애플리케이션 곳곳에서 필요할 예정이라, Context로 만든다.

// 기본값을 초기화 하지만 실제로는 사용하지 않는다.
// 초기화하는 이유는 나중에 IDE 자동완성으로 사용할 수 있다.
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
