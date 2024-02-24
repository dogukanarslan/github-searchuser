interface BadgeProps {
  children: React.ReactNode;
}

export const Badge = (props: BadgeProps) => {
  const { children } = props;

  return (
    <span className="whitespace-nowrap rounded-full bg-gray-500 px-2 py-1 text-sm text-white">
      {children}
    </span>
  );
};