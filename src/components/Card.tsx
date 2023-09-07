import { Button } from './Button';
import { useHistory } from 'react-router-dom';
interface CardProps {
  title?: string;
  body?: string;
  img?: string;
  link?: string;
}

export const Card = (props: CardProps) => {
  const { title, body, img, link } = props;
  const history = useHistory();

  return (
    <div className="overflow-hidden rounded-lg shadow-sm">
      {img && <img src={img} className="h-64 w-full object-cover" />}

      <div className="bg-white p-4">
        {title && <h4>{title}</h4>}
        {body && <p>{body}</p>}
        {link && <Button primary onClick={() => history.push(link)}>More Info</Button>}
      </div>
    </div>
  );
};
