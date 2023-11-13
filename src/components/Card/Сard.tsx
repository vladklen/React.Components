import { Link } from 'react-router-dom';
import { StyledCard, StyledCardPreview } from './Styles';

interface CardProps {
  title: string;
  image: string;
  id: number;
}

function Card({ title, image, id }: CardProps) {
  return (
    <Link to={`details/${id}`} data-testid={`test${id}`}>
      <StyledCard>
        <h3>{title}</h3>
        <StyledCardPreview
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />
      </StyledCard>
    </Link>
  );
}

export { Card };
export type { CardProps };
