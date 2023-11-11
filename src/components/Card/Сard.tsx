import { StyledCard, StyledCardPreview } from './Styles';

interface CardProps {
  title: string;
  image: string;
}

function Card({ title, image }: CardProps) {
  return (
    <StyledCard>
      <h3>{title}</h3>
      <StyledCardPreview
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
    </StyledCard>
  );
}

export { Card };
export type { CardProps };
