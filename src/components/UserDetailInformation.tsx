import { Briefcase, MapPin, Mail, Link as LinkIcon } from 'react-feather';

interface Props {
  login: string;
  name: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  blog: string | null;
}

export const UserDetailInformation = (props: Props) => {
  const { name, login, company, location, email, blog } = props;
  return (
    <div className="py-5">
      <h1 className="text-lg font-bold">{name}</h1>
      <h3>{login}</h3>
      <div className="mt-2">
        {company && (
          <div className="flex items-center gap-x-2">
            <Briefcase size="16" /> {company}
          </div>
        )}
        {location && (
          <div className="flex items-center gap-x-2">
            <MapPin size="16" /> {location}
          </div>
        )}
        {email && (
          <div className="flex items-center gap-x-2">
            <Mail size="16" /> {email}
          </div>
        )}
        {blog && (
          <div className="flex items-center gap-x-2">
            <LinkIcon size="16" /> {blog}
          </div>
        )}
      </div>
    </div>
  );
};
