import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  size?: string;
}

export const Button = (props: ButtonProps) => {
  const {
    color = 'default',
    size = 'md',
    children,
    className,
    disabled,
    ...rest
  } = props;

  const classes = clsx(
    className,
    'inline-block cursor-pointer rounded-lg',
    {
      'bg-primary text-white': color === 'primary',
      'bg-secondary text-white': color === 'secondary',
      'bg-gray-400 text-white': color === 'default',
      'bg-transparent text-black': color === 'transparent',
      'cursor-not-allowed opacity-60': disabled,
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
