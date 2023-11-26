import Image from 'next/image';
import { ModalWrapper } from '../UI/Styles';
import MyButton from '../UI/MyButton/MyButton';
import { StyledPersonalCard, StyledPersonalCardContent } from './Styles';
import { IAnime } from '@/types/types';

export default function PersonDetails(data: IAnime) {
  const { title, title_japanese, rating, status, score, mal_id, images } = data;

  return (
    <ModalWrapper onClick={() => {}} data-testid={`cardDetails${mal_id}`}>
      <StyledPersonalCard>
        <Image
          src={images.jpg.image_url}
          alt={`${title} preview`}
          width={250}
          height={300}
        />
        <StyledPersonalCardContent>
          <h3>Title: {title}</h3>
          <h3>{title_japanese}</h3>
          <p>Rating:{rating}</p>
          <p>Status:{status}</p>
          <p>Score: {score}</p>
          <MyButton
            click={() => {}}
            color="blue"
            message="Close"
            dataTest="test-CloseButton"
          />
        </StyledPersonalCardContent>
      </StyledPersonalCard>
    </ModalWrapper>
  );
}
