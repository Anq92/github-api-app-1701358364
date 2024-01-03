import { UserData } from "../types";

function Dashboard(props: { userData: UserData }) {
  return (
    <>
      <h1>Hello {props.userData?.login}</h1>
    </>
  );
}

export default Dashboard;
