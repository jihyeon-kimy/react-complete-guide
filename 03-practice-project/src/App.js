import { useContext, useEffect, useState } from "react";
import MainHeader from "./components/MainHeader/MainHeader";
import ProductsList from "./components/Products/ProductsList";
import Modal from "./components/CartModal/Modal";
import ProductAmountContext from "./components/store/product-amount-context";

function App() {
  const ProductCtx = useContext(ProductAmountContext);

  const cartItems = ProductCtx.products.filter((product) => product.amount > 0);

  const [openCartModal, setCartOpenModal] = useState(false);

  const OpenCartModalHandler = () => {
    if (cartItems.length > 0) {
      setCartOpenModal(true);
    }
  };

  const CloseCartModalHandler = () => {
    setCartOpenModal(false);
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      CloseCartModalHandler();
    }
  }, [cartItems]);

  return (
    <>
      <MainHeader onOpenCartModal={OpenCartModalHandler} />
      <ProductsList />
      {openCartModal && (
        <Modal products={cartItems} onCloseCartModal={CloseCartModalHandler} />
      )}
    </>
  );
}

export default App;
