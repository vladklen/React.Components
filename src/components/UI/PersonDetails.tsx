import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { ModalWrapper, StyledCard } from './Styles';

// interface CardProps {
//   birth_year: string;
//   name: string;
//   height: string;
//   mass: string;
//   gender: string;
// }

export default function PersonDetails() {
  let navigate = useNavigate();
  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    const startSearch = async () => {
      setLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${name}`
      );
      const data = await response.json();
      setLoading(false);
      setContent(data.results);
    };
    startSearch();
  }, [name]);

  return (
    <ModalWrapper onClick={() => navigate(-1)}>
      <StyledCard>
        {content.length && !loading ? (
          <h3>Name: {content[0].name}</h3>
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
      </StyledCard>
    </ModalWrapper>
  );
}
