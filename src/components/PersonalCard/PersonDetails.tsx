import { useNavigate, useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { ModalWrapper } from '../UI/Styles';
import MyButton from '../UI/MyButton/MyButton';
import {
  StyledPersonalCard,
  StyledPersonalCardContent,
  StyledCardImage,
} from './Styles';
import { useGetCardByIdQuery } from '../../store/animeApi';

export default function PersonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetCardByIdQuery(`${id}`);

  return (
    <ModalWrapper onClick={() => navigate(-1)} data-testid={`cardDetails${id}`}>
      <StyledPersonalCard>
        {data && !isLoading ? (
          <>
            <StyledCardImage
              style={{
                backgroundImage: `url("${data.data.images.jpg.image_url}")`,
              }}
            />
            <StyledPersonalCardContent>
              <h3>Title: {data.data.title}</h3>
              <h3>{data.data.title_japanese}</h3>
              <p>Rating:{data.data.rating}</p>
              <p>Status:{data.data.status}</p>
              <p>Score: {data.data.score}</p>
              <MyButton
                click={() => navigate(-1)}
                color="blue"
                message="Close"
                dataTest="test-CloseButton"
              />
            </StyledPersonalCardContent>
          </>
        ) : (
          <div data-testid="test-loader">
            <ColorRing
              data-testid="test-cardDetails-loader"
              visible
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
      </StyledPersonalCard>
    </ModalWrapper>
  );
}
