import { Link } from 'react-router-dom';

interface CustomLinkProps {
  to: any;
  children: React.ReactNode;
  active?: boolean;
  classes?: string;
}

export const CustomLink = (props: CustomLinkProps) => {
  const { to, children, active, classes } = props;
  return (
    <Link
      className={`nav-link${active ? ' active' : ''}${
        classes ? ' ' + classes : ''
      }`}
      to={to}
    >
      {children}
    </Link>
  );
};
