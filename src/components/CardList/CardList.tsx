import { useSearchParams } from 'react-router-dom';
import { Card } from '../Card/Сard';
import { IAnime } from '../../types/types';
import { useGetCardListQuery } from '../../store/animeApi';

export const TEXT_CONTENT = {
  ERROR: 'Items Not Found',
};

export default function CardList({ skip }: { skip: boolean }) {
  console.log('рендерится cardlist');
  const [search] = useSearchParams();
  const { data } = useGetCardListQuery(
    {
      searchQuery: search.get('search') as string,
      pageQuery: search.get('page') as string,
      perPageQuery: search.get('limit') as string,
    },
    { skip }
  );

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
