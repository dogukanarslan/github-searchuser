interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
}

export const Button = (props: ButtonProps) => {
  const { color, children, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={`${className ? className + ' ' : ''}${
        color === 'primary' ? 'bg-indigo-600 text-white ' : ''
      }cursor-pointer inline-block rounded px-4 py-2 text-sm font-medium focus:ring active:text-indigo-500`}
    >
      {children}
    </button>
  );
};
