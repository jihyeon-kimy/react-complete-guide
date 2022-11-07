import { useState } from "react";
import Members from "./components/Members/Members";
import NewMember from "./components/NewMember/NewMember";
import NewMemberRefPractice from "./components/NewMember/NewMember_Ref_practice";

// let DUMMY_MEMBERS = [
//   { id: "p1", name: "Maximilian", age: 30 },
//   { id: "p2", name: "Schwarzmuller", age: 30 },
// ];

function App() {
  const [members, setMembers] = useState([]);

  const addMemberHandler = (memberName, memberAge) => {
    setMembers((prev) => [
      ...prev,
      { id: Math.random().toString(), name: memberName, age: memberAge },
    ]);
  };

  return (
    <>
      {/* <NewMember onAddMember={addMemberHandler} /> */}
      <NewMemberRefPractice onAddMember={addMemberHandler} />
      <Members members={members} />
    </>
  );
}

export default App;
