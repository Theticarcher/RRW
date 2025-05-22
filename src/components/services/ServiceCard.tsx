// ServiceCard.tsx
import React from 'react';
import '../../assets/info.json';

type Props = {
  id: string;
  name: string;
  onClick: () => void;
  colorClass?: string; // 👈 allow passing color class
};

export const ServiceCard: React.FC<Props> = React.memo(({ id, name, onClick, colorClass = '' }) => {
  return (
    <div className={`service-card ${colorClass}`} id={id} onClick={onClick}>
      <h4>{name}</h4>
    </div>
  );
});