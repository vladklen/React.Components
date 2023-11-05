import { StyledCard } from './UI/Styles';

interface CardProps {
  birth_year: string;
  name: string;
  height: string;
  mass: string;
  gender: string;
}

function Card({ birth_year, name, height, mass, gender }: CardProps) {
  return (
    <StyledCard>
      <h3>Name:{name}</h3>
      <p>BirthDate:{birth_year}</p>
      <p>Height:{height}</p>
      <p>Mass:{mass}</p>
      <p>Gender:{gender}</p>
    </StyledCard>
  );
}

export { Card };
export type { CardProps };
