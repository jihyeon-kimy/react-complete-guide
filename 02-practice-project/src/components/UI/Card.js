import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${styles.card} ${props.className}`} type={props.type || "button"}>
      {props.children}
    </div>
  );
};

export default Card;
