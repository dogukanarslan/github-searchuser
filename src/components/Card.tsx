import { Button } from './Button';
import { redirect } from 'next/navigation';
interface CardProps {
  title?: string;
  body?: string;
  img?: string;
  link?: string;
}

export const Card = (props: CardProps) => {
  const { title, body, img, link } = props;

  return (
    <div className="overflow-hidden rounded-lg shadow-sm">
      {img && <img src={img} className="h-64 w-full object-cover" />}

      <div className="bg-white p-4">
        {title && <h4>{title}</h4>}
        {body && <p>{body}</p>}
        {link && <Button onClick={() => redirect(link)}>More Info</Button>}
      </div>
    </div>
  );
};
