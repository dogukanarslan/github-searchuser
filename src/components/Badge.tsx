interface BadgeProps extends React.HTMLProps<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Badge = (props: BadgeProps) => {
  const { children, ...rest } = props;

  return (
    <span
      className="whitespace-nowrap rounded-full bg-secondary px-2 py-1 text-sm text-white"
      {...rest}
    >
      {children}
    </span>
  );
};
