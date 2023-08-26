interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="mt-1 w-full rounded-md border-gray-200 shadow-sm text-sm"
    />
  );
};
