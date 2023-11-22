import { useSelector } from 'react-redux';
import { Card } from '../Card/Сard';
import { IAnime } from '../../types/types';
import { useGetCardListQuery } from '../../store/animeApi';
import { RootState } from '../../store/store';

export const TEXT_CONTENT = {
  ERROR: 'Items Not Found',
};

export default function CardList() {
  const { value } = useSelector((state: RootState) => state.value);
  const { data } = useGetCardListQuery(value);

  if (!data) {
    return <h3>{TEXT_CONTENT.ERROR}</h3>;
  }
  return data.data.map((el: IAnime) => (
    <Card
      title={el.title}
      image={el.images.jpg.image_url}
      key={el.mal_id}
      id={el.mal_id}
    />
  ));
}
