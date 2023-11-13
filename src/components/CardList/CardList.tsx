import { useContext } from 'react';
import { Card } from '../Card/Сard';
import { AppContext } from '../../context/Context';
import { IAnime } from '../../api/StartSearch';

export const TEXT_CONTENT = {
  ERROR: 'Items Not Found',
};

export default function CardList() {
  const { data } = useContext(AppContext);
  if (!data.length) {
    return <h3>{TEXT_CONTENT.ERROR}</h3>;
  }
  return data.map((el: IAnime) => (
    <Card
      title={el.title}
      image={el.images.jpg.image_url}
      key={el.mal_id}
      id={el.mal_id}
    />
  ));
}
