import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Card } from '../Card/Сard';
import { AppContext } from '../../context/Context';
import { IAnime } from '../../api/StartSearch';

export default function CardList() {
  const { data } = useContext(AppContext);
  return (
    <>
      {data.map((el: IAnime) => (
        <Link to={`details/${el.mal_id}`} key={el.mal_id}>
          <Card title={el.title} image={el.images.jpg.image_url} />
        </Link>
      ))}
    </>
  );
}
