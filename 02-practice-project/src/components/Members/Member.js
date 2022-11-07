import styles from "./Member.module.css";

const Member = (props) => {
  console.log(props.name);
  return (
    <li className={styles.member}>
      {props.name} ({props.age} years old)
    </li>
  );
};

export default Member;
