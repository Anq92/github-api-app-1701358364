import { useState, useEffect, useMemo } from "react";
import { UserData } from "../types";
import RecentRepo from "./recent_repo/RecentRepo";
import { RepoData } from "../types";
import { UserService } from "../service/UserService";

function Dashboard() {

  const [githubReposData, setGithubReposData] = useState<RepoData[] | null>();
  const [userData, setUserData] = useState<UserData>();

  const userService = useMemo(() => {
    return new UserService()
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await userService.getUserData();
      setUserData(userData);
    };
    getUserData();
  }, [setUserData, userService]);

  useEffect(() => {
    const getGithubRepos = async () => {
      const githubRepos = await userService.getGithubRepos();
      if (!githubRepos.length) {
        setGithubReposData(null);
      } else {
        setGithubReposData(githubRepos);
      }
    }
    getGithubRepos();
  }, [setGithubReposData, userService]);

  const heading = userData === undefined ? <>Loading...</> : <>Hello {userData.login}</>;
  const content = githubReposData === undefined
    ? <>Loading</>
    : githubReposData === null
      ? <>No repositories found</>
      : <RecentRepo {...githubReposData[0]} />
  return (
    <>
      <h1>{heading}</h1>
      <div>{content}</div>
    </>
  );
}

export default Dashboard;
