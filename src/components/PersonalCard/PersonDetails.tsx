import { useNavigate, useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { ModalWrapper } from '../UI/Styles';
import MyButton from '../UI/MyButton/MyButton';
import {
  StyledPersonalCard,
  StyledPersonalCardContent,
  StyledCardImage,
} from './Styles';
import { useGetCardByIdQuery } from '../../store/animeApi';
import { RootState } from '../../store/store';

export default function PersonDetails() {
  const { value } = useSelector((state: RootState) => state.value);
  const { id } = useParams();
  const { data, isLoading } = useGetCardByIdQuery(`${id}`);
  const navigate = useNavigate();

  return (
    <ModalWrapper
      onClick={() => {
        navigate(
          `/?search=${value.search}&page=${value.page}&limit=${value.limit}`
        );
      }}
      data-testid={`cardDetails${id}`}
    >
      <StyledPersonalCard>
        {data && !isLoading ? (
          <>
            <StyledCardImage
              style={{
                backgroundImage: `url("${data.images.jpg.image_url}")`,
              }}
            />
            <StyledPersonalCardContent>
              <h3>Title: {data.title}</h3>
              <h3>{data.title_japanese}</h3>
              <p>Rating:{data.rating}</p>
              <p>Status:{data.status}</p>
              <p>Score: {data.score}</p>
              <MyButton
                click={() => {
                  navigate(
                    `/?search=${value.search}&page=${value.page}&limit=${value.limit}`
                  );
                }}
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
