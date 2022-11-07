import Card from "../UI/Card";
import Member from "./Member";
import styles from "./Members.module.css";

const Members = (props) => {
  if (props.members.length === 0) {
    return <Card className={styles.members}>Add new member!</Card>;
  }

  return (
    <Card className={styles.members}>
      <ul>
        {props.members.map((member) => {
          return <Member key={member.id} name={member.name} age={member.age} />;
        })}
      </ul>
    </Card>
  );
};

export default Members;
