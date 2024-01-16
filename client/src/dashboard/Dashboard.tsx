import { UserData } from "../types";
import RecentRepo from "./recent_repo/RecentRepo";

function Dashboard(props: { userData: UserData }) {
  return (
    <>
      <h1>Hello {props.userData?.login}</h1>
      <RecentRepo />
    </>
  );
}

export default Dashboard;
