interface SelectInterface
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = (props: SelectInterface) => {
  return (
    <select
      {...props}
      className="w-full rounded-md border-gray-200 text-sm shadow-xs"
    />
  );
};
