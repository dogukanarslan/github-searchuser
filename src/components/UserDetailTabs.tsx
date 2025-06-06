import { Link } from 'react-router';

interface Props {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const UserDetailTabs = (props: Props) => {
  const { selectedTab, setSelectedTab } = props;

  return (
    <nav className="mb-2 flex gap-6 transition-all" aria-label="Tabs">
      <Link
        to="#"
        className={`${
          selectedTab === 'followers' ? 'border-b-2 ' : ''
        }text-sm border-secondary font-medium hover:border-b-2`}
        onClick={() => setSelectedTab('followers')}
      >
        Followers
      </Link>
      <Link
        to="#"
        className={`${
          selectedTab === 'following' ? 'border-b-2 ' : ''
        }text-sm border-secondary font-medium hover:border-b-2`}
        onClick={() => setSelectedTab('following')}
      >
        Following
      </Link>
      <Link
        to="#"
        className={`${
          selectedTab === 'starred' ? 'border-b-2 ' : ''
        }text-sm border-secondary font-medium hover:border-b-2`}
        onClick={() => setSelectedTab('starred')}
      >
        Starred
      </Link>
      <Link
        to="#"
        className={`${
          selectedTab === 'repos' ? 'border-b-2 ' : ''
        }text-sm border-secondary font-medium hover:border-b-2`}
        onClick={() => setSelectedTab('repos')}
      >
        Repositories
      </Link>
    </nav>
  );
};
