export interface IUser {
    id: number
    avatar_url: string
    login: string
    name: string
    company: string
    blog: string
    location: string
    email: string
    bio: string
    public_repos: number
    followers: number
    following: number
}

export interface IRepository {
    id: number
    name: string
    description: string
}
