import Link from 'next/link';
import Image from 'next/image';
import { StyledCard, StyledCardPreview } from './Styles';

interface CardProps {
  title: string;
  image: string;
  id: number;
}

function Card({ title, image, id }: CardProps) {
  console.log(title);
  return (
    <Link href={`details/${id}`} data-testid={`test${id}`}>
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
