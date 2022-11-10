import React from "react";
import ReactDOM from "react-dom";

import Card from "../UI/Card";
import Item from "./Item";

import classes from "./Modal.module.css";

const Backdrop = ({ onCloseCartModal }) => {
  return <div className={classes["back-drop"]} onClick={onCloseCartModal} />;
};

const ModalOverlay = ({ products }) => {
  const lastProductId = products[products.length - 1].id;

  return (
    <Card className={classes.modal}>
      <ul>
        {products.map((product) => {
          return (
            <Item key={product.id} product={product} lastProductId={lastProductId} />
          );
        })}
      </ul>
    </Card>
  );
};

const Modal = ({ products, onCloseCartModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseCartModal={onCloseCartModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay products={products} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
