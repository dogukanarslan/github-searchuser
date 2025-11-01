import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
}

export const Button = (props: ButtonProps) => {
  const { color = 'primary', children, className, disabled, ...rest } = props;

  const classes = clsx(
    className,
    'hover:bg-primary-light inline-block cursor-pointer rounded-md px-3 py-1.5',
    {
      'bg-primary text-white': color === 'primary',
      'cursor-not-allowed opacity-60': disabled,
    }
  );

  return (
    <button disabled={disabled} {...rest} className={classes}>
      {children}
    </button>
  );
};
