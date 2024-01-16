import { Endpoints } from "@octokit/types";

type UserData = {
  avatar_url: URL;
  bio: string;
  blog: string;
  company: string | null;
  created_at: Date;
  email: string | null;
  events_url: string;
  followers: number;
  followers_url: URL;
  following: number;
  following_url: URL;
  gists_url: URL;
  gravatar_id: string;
  hireable: boolean;
  html_url: URL;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: URL;
  public_gists: number;
  public_repos: number;
  received_events_url: URL;
  repos_url: URL;
  site_admin: boolean;
  starred_url: URL;
  subscriptions_url: URL;
  twitter_username: string | null;
  type: string;
  updated_at: Date;
  url: URL;
};

type RepoDataResponse = Response & Endpoints["GET /user/repos"]["response"];
type RepoData = RepoDataResponse["data"][1];

export type { UserData, RepoData };


