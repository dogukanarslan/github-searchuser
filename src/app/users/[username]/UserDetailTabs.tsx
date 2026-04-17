import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const TABS = [
  { value: 'followers', label: 'Followers' },
  { value: 'following', label: 'Following' },
  { value: 'starred', label: 'Starred' },
  { value: 'repos', label: 'Repositories' },
];

export const UserDetailTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedTab = searchParams.get('tab') || 'followers';

  const changeTab = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.push(pathname + '?' + params.toString());
  };

  return (
    <nav className="mb-2 flex gap-6 transition-all" aria-label="Tabs">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          className={`border-b-2 ${selectedTab === tab.value ? 'border-primary' : 'hover:border-primary border-transparent'} text-sm font-medium`}
          onClick={() => changeTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};
