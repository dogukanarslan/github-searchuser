interface Props {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export const UserDetailHeader = (props: Props) => {
  const { avatar_url, public_repos, followers, following } = props;
  return (
    <div className="flex flex-col items-center gap-10 sm:flex-row">
      <img className="w-48 rounded-full" src={avatar_url} alt="" />
      <ul className="flex gap-x-5 text-center">
        <li>
          <div>
            <div className="font-bold">{public_repos}</div>
            <h3>Repositories</h3>
          </div>
        </li>
        <li>
          <div>
            <div className="font-bold">{followers}</div>
            <h3>Followers</h3>
          </div>
        </li>
        <li>
          <div>
            <div className="font-bold">{following}</div>
            <h3>Following</h3>
          </div>
        </li>
      </ul>
    </div>
  );
};
