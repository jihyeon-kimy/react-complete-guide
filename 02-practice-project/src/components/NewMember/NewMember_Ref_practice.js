import { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./NewMember.module.css";
import ErrorModal from "../UI/ErrorModal";

const NewMemberRefPractice = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalide Input",
        message: "Please enter a valid name and age (non-empty values)",
      });

      return;
    }

    if (+enteredUserAge < 1) {
      setError({
        title: "Invalide Input",
        message: "Please enter a valid age (>0)",
      });

      return;
    }

    props.onAddMember(enteredName, enteredUserAge);
    nameInputRef.current.value = ""; // DOM을 조작하기 위해 ref를 쓰는 경우는 드물다. 여기서는 새로운 요소를 추가하거나 CSS 클래스를 변경하는게 아니다. 그냥 사용자가 입력한 내용을 바꾼것 뿐. 흔히 쓰이는 방법은 아니다.
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}

      <Card className={styles["new-member"]}>
        <form onSubmit={addUserHandler} className={styles["new-member__form"]}>
          <label htmlFor="username">enteredUserName</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age(Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default NewMemberRefPractice;
