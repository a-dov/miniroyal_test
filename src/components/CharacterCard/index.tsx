import React from 'react';
import { Link } from 'react-router-dom';
import { Card as ACard, Image, Skeleton } from 'antd';
import svglogo from '../../images/death-star.svg';

interface ICardProps {
  imageUrl?: string;
  name?: string;
  id?: string;
  loading: boolean;
}

export function Card({
  imageUrl, name, id, loading,
}: ICardProps) {
  return (
    <ACard
      hoverable
      cover={(
        <Image
          style={{ objectFit: 'cover', aspectRatio: '210/288' }}
          src={loading ? svglogo : imageUrl}
          preview={false}
          alt={`Image of ${name}`}
        />
      )}
    >
      {loading ? (
        <Skeleton title paragraph={false} />
      ) : (
        <>
          <div className="card-name">
            <span>{name}</span>
          </div>
          <Link
            style={{ position: 'absolute', inset: '0' }}
            to={`/characters/${id}`}
          />
        </>
      )}
    </ACard>
  );
}
