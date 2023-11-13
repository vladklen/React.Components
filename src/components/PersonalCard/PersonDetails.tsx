import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ModalWrapper } from '../UI/Styles';
import { IAnime, getAnimeById } from '../../api/StartSearch';
import MyButton from '../UI/MyButton/MyButton';
import {
  StyledPersonalCard,
  StyledPersonalCardContent,
  StyledCardImage,
} from './Styles';

export default function PersonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<IAnime | null>(null);

  useEffect(() => {
    if (id) {
      const startSearch = async () => {
        setLoading(true);
        const data = await getAnimeById(id);
        setLoading(false);
        if (data) {
          setContent(data.data);
        }
      };
      startSearch();
    }
  }, [id]);

  return (
    <ModalWrapper onClick={() => navigate(-1)} data-testid={`cardDetails${id}`}>
      <StyledPersonalCard>
        {content && !loading ? (
          <>
            <StyledCardImage
              style={{
                backgroundImage: `url("${content.images.jpg.image_url}")`,
              }}
            />
            <StyledPersonalCardContent>
              <h3>Title: {content.title}</h3>
              <h3>{content.title_japanese}</h3>
              <p>Rating:{content.rating}</p>
              <p>Status:{content.status}</p>
              <p>Score: {content.score}</p>
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
