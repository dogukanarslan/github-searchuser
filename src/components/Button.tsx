import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  size?: string;
}

export const Button = (props: ButtonProps) => {
  const {
    color = 'default',
    size = 'md',
    children,
    className,
    ...rest
  } = props;

  const classes = clsx(
    className,
    'inline-block cursor-pointer rounded-lg px-3 py-2',
    {
      'bg-indigo-600 text-white': color === 'primary',
      'bg-gray-400 text-white': color === 'default',
      'bg-transparent text-black': color === 'transparent',
      'px-2 py-1': size === 'sm',
      'px-3 py-2': size === 'md',
      'px-4 py-3': size === 'lg',
    }
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};
