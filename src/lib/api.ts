import { Octokit } from 'octokit';

export const createOctokit = (auth?: string) =>
  new Octokit(auth ? { auth } : {});

export const octokit = createOctokit();
