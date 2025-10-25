import React from 'react';
import { Button } from './Button';
import { redirect } from 'next/navigation';
interface CardProps {
  title?: string;
  body?: React.ReactNode;
  img?: string;
  link?: string;
}

export const Card = (props: CardProps) => {
  const { title, body, img, link } = props;

  return (
    <div className="overflow-hidden rounded-xl border p-2 shadow-xs">
      {img && <img src={img} className="h-64 w-full object-cover" />}

      <div className="bg-white p-4">
        {title && <h4>{title}</h4>}
        {body}
        {link && <Button onClick={() => redirect(link)}>More Info</Button>}
      </div>
    </div>
  );
};
