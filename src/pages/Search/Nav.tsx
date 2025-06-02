import { Button } from 'components';

export enum Tab {
  Users = 'users',
  Repositories = 'repositories',
  Commits = 'commits',
}

const NAV_ITEMS: { label: string; value: Tab }[] = [
  { label: 'Users', value: Tab.Users },
  { label: 'Repositories', value: Tab.Repositories },
  { label: 'Commits', value: Tab.Commits },
];

interface Props {
  activeTab: Tab;
  changeTab: (tab: Tab) => void;
}

export const Nav = (props: Props) => {
  const { activeTab, changeTab } = props;

  return (
    <nav className="flex gap-2" aria-label="Tabs">
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.value}
          color="transparent"
          className={`${activeTab === item.value ? 'rounded-none border-b border-black' : ''}`}
          onClick={() => changeTab(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
};
