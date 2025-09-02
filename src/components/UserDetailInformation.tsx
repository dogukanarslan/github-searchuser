import { Endpoints } from '@octokit/types';
import { Briefcase, MapPin, Mail, Link as LinkIcon } from 'react-feather';

interface Props {
  user: Endpoints['GET /user']['response']['data'];
}

export const UserDetailInformation = (props: Props) => {
  const { user } = props;
  const { login, name, company, blog, location, email } = user;

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
