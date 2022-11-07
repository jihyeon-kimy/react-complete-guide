import ReactDOM from "react-dom";

import Button from "./Button";
import Card from "./Card";
import styles from "./ErrorModal.module.css";

// 포털을 사용하기 쉽도록, 모달 > backdrop과 modaloverlay 둘로 나눔
// 새로운 컴포넌트를 동일한 파일에 추가하는 이유는, 이 앱에서 이 backdrop 컴포넌트는 모달과 함께 사용하기만 할 것이기 때문이다. > 모든 컴포넌트를 하나의 큰 파일에 저장
// 다른 파일에 나눌 수도 있다.

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOberlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.title}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer>
        <Button className={styles.action} onClick={props.onConfirm}>
          Okay
        </Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOberlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default ErrorModal;
