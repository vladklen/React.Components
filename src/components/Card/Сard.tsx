import Image from 'next/image';
import { StyledCard } from './Styles';
import router, { useRouter } from 'next/router';

interface CardProps {
  title: string;
  image: string;
  id: number;
}

function Card({ title, image, id }: CardProps) {
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
    return (
      <div onClick={handleOpenDetails}>
        <StyledCard>
          <h3>{title}</h3>
          <Image
            src={image}
            alt={`${title} preview`}
            width={150}
            height={200}
          />
        </StyledCard>
      </div>
    );
  };
}

export { Card };
export type { CardProps };
