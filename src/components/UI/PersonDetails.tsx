import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ModalWrapper, StyledPersonalCard } from './Styles';
import { IAnime } from '../../pages/Home';

export default function PersonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<IAnime | null>(null);

  useEffect(() => {
    const startSearch = async () => {
      setLoading(true);
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data: { data: IAnime } = await response.json();
      setLoading(false);
      setContent(data.data);
    };
    startSearch();
  }, [id]);

  return (
    <ModalWrapper onClick={() => navigate(-1)}>
      <StyledPersonalCard>
        {content && !loading ? (
          <>
            <h3>Title: {content.title}</h3>
            <img src={content.images.jpg.image_url} alt={content.title} />
            <p>Episodes: {content.episodes}</p>
            <p>Score: {content.score}</p>
          </>
        ) : (
          <ColorRing
            visible
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )}
      </StyledPersonalCard>
    </ModalWrapper>
  );
}
