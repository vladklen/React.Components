import { StyledCard } from './UI/Styles';

interface CardProps {
  title: string;
  image: string;
}

function Card({ title, image }: CardProps) {
  return (
    <StyledCard>
      <h3>{title}</h3>
      <img src={image} alt={title} />
    </StyledCard>
  );
}

export { Card };
export type { CardProps };
