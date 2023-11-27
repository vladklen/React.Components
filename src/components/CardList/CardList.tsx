import Card from '@/components/Card/Сard';
import { IAnime, IDataResponse } from '../../types/types';

export const TEXT_CONTENT = {
  ERROR: 'Items Not Found',
};

export default function CardList(list: IDataResponse) {
  const { data } = list;
  if (data.length === 0) {
    return <h3>{TEXT_CONTENT.ERROR}</h3>;
  }
  return (
    <>
      {data.map((el: IAnime) => (
        <Card
          title={el.title}
          image={el.images.jpg.image_url}
          key={el.mal_id}
          id={el.mal_id}
        />
      ))}
    </>
  );
}
