/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { StyledCard } from './Styles';

interface CardProps {
  title: string;
  image: string;
  id: number;
}

export default function Card({ title, image, id }: CardProps) {
  const router = useRouter();
  const { pathname, query } = router;

  const handleOpenDetails = () => {
    router.push({
      pathname,
      query: {
        ...query,
        details: String(id),
      },
    });
  };

  return (
    <div data-testid={`card_${id}`} onClick={handleOpenDetails}>
      <StyledCard data-testid="card">
        <h3>{title}</h3>
        <Image src={image} alt={`${title} preview`} width={150} height={200} />
      </StyledCard>
    </div>
  );
}

export type { CardProps };
