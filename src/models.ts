export interface IUser {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  public_repos: number;
  followers: number;
  followers_url: string;
  following_url: string;
  following: number;
  type: string;
}

export interface IRepository {
  id: number;
  name: string;
  description: string;
  full_name: string;
  owner: IUser;
  branches_url: string;
}

export interface ICommit {
  author: { name: string } | null;
  node_id: string;
  commit: {
    message: string;
  };
}

export interface ISearch {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

export interface IBranch {
  name: string;
  protected: boolean;
}

export interface ILabel {
  color: string;
  name: string;
  description: string | null;
}
