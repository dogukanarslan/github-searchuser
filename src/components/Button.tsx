interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={`${
        className ? className + ' ' : ''
      }inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500`}
      {...rest}
    >
      {children}
    </button>
  );
};
