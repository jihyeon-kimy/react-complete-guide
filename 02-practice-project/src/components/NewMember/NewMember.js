import { useState, useRef } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "./NewMember.module.css";
import ErrorModal from "../UI/ErrorModal";

const NewMember = (props) => {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredUserAge, setEnteredUserAge] = useState("");
  // const [invalidPopUpAboutEmpty, setInvalidPopUpAboutEmpty] = useState(false);
  // const [invalidPopUpAboutAge, setInvalidPopUpAboutAge] = useState(false);

  const [error, setError] = useState();

  const nameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredUserAge(event.target.value);
  };

  // const closePopUpAboutEmptyHandler = () => {
  //   setInvalidPopUpAboutEmpty(false);
  // };

  // const closePopUpAboutAgeHandler = () => {
  //   setInvalidPopUpAboutAge(false);
  // };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUserName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalide Input",
        message: "Please enter a valid name and age (non-empty values)",
      });
      // setInvalidPopUpAboutEmpty(true);
      return;
    }

    if (+enteredUserAge < 1) {
      setError({
        title: "Invalide Input",
        message: "Please enter a valid age (>0)",
      });
      // setInvalidPopUpAboutAge(true);
      return;
    }

    props.onAddMember(enteredUserName, enteredUserAge);
    setEnteredUserName("");
    setEnteredUserAge("");
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
      {/* {invalidPopUpAboutEmpty && (
        <ErrorModal
          onClose={closePopUpAboutEmptyHandler}
          title="Invalide Input"
          message="Please enter a valid name and age (non-empty values)"
        />
      )}
      {invalidPopUpAboutAge && (
        <ErrorModal
          onClose={closePopUpAboutAgeHandler}
          title="Invalide Input"
          message="Please enter a valid age ( &gt;0)"
        />
      )} */}
      <Card className={styles["new-member"]}>
        <form onSubmit={addUserHandler} className={styles["new-member__form"]}>
          <label htmlFor="username">enteredUserName</label>
          <input
            id="username"
            type="text"
            value={enteredUserName}
            onChange={nameChangeHandler}
          />
          <label htmlFor="age">Age(Years)</label>
          <input
            id="age"
            type="number"
            value={enteredUserAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default NewMember;
