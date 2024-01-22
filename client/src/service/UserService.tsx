import { RepoData, UserData } from "../types";
export class UserService {

    private accessToken = localStorage.getItem("accessToken");

    async getUserData() : Promise<UserData>  {
        const response = await fetch("https://api.github.com/user", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + this.accessToken,
            },
          });
        
        const data = await response.json();
        return data;
    } 

    async getGithubRepos() : Promise<RepoData[]> {
        const response = await fetch("https://api.github.com/user/repos?sort=created", {
            method: "GET",
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: "Bearer " + this.accessToken,
            }
        })
        const data = await response.json();
        return data;
    }
}