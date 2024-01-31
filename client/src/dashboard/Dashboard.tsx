import { useState, useEffect } from "react";
import { UserData } from "../types";
import RecentRepo from "./recent_repo/RecentRepo";
import ReposBrowser from "./repos_browser/ReposBrowser";
import { RepoData } from "../types";
import { UserService } from "../service/UserService";

const userService = new UserService();

function Dashboard() {

  const [githubReposData, setGithubReposData] = useState<RepoData[]>();
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await userService.getUserData();
      setUserData(userData);
    };
    getUserData();
  }, [setUserData]);

  useEffect(() => {
    const getGithubRepos = async () => {
      const githubRepos = await userService.getGithubRepos();
      setGithubReposData(githubRepos);
    }
    getGithubRepos();
  }, [setGithubReposData]);

  const heading = userData === undefined ? <>Loading...</> : <>Hello {userData.login}</>;
  const content = githubReposData === undefined
    ? <>Loading</>
    : !githubReposData.length
      ? <>No repositories found</>
      : <>
        <RecentRepo {...githubReposData[0]} />
        <ReposBrowser reposData={githubReposData} />
      </>
  return (
    <>
      <h1>{heading}</h1>
      <div>{content}</div>
    </>
  );
}

export default Dashboard;
