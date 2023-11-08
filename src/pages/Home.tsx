/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { ContentWrapper, SearchWrapper } from '../components/UI/Styles';
import MyInput from '../components/UI/MyInput';
import MyButton from '../components/UI/MyButton/MyButton';
import { Card } from '../components/Сard';
import Pagination from '../components/UI/Pagination';
import SelectAmount from '../components/UI/SelectAmount';
import getDataFromApi, { IAnime } from '../api/StartSearch';

export default function Home() {
  const [search, setSearch] = useSearchParams();
  const [text, setText] = useState(localStorage.getItem('test') ?? '');
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [content, setContent] = useState<IAnime[] | []>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let myValue = '';

  const handleInputChange = (event: { target: { value: string } }) => {
    myValue = event.target.value;
    localStorage.setItem('test', myValue);
  };

  const handleSearchStart = () => {
    setText(myValue);
    let params = {};
    for (const [key, value] of search) {
      params = { ...params, [key]: value, page: '1', search: myValue };
    }
    setSearch(params);
  };

  useEffect(() => {
    const startSearch = async () => {
      setLoading(true);
      const data = await getDataFromApi(search);
      setPostsPerPage(data.pagination.items.per_page);
      setLoading(false);
      setTotalPosts(data.pagination.items.total);
      setContent(data.data);
    };

    if (location.pathname.length === 1) {
      if (
        !search.get('search') &&
        !search.get('page') &&
        !search.get('limit')
      ) {
        if (localStorage.getItem('test')) {
          setSearch({
            search: String(localStorage.getItem('test')),
            page: '1',
            limit: '10',
          });
        } else {
          setSearch({ page: '1', limit: '10' });
        }
        return;
      }
      startSearch();
    }
  }, [location.pathname.length, search, setSearch]);

  return (
    <div>
      <SearchWrapper>
        <MyInput message={text} change={handleInputChange} />
        <MyButton click={handleSearchStart} color="blue" message="Search" />
      </SearchWrapper>
      <h2>Results:</h2>
      <ContentWrapper>
        {loading && (
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
        {content.length && !loading
          ? content.map((el: IAnime) => (
              <Link to={`details/${el.mal_id}`} key={el.mal_id}>
                <Card title={el.title} image={el.images.jpg.image_url} />
              </Link>
            ))
          : !loading && <h3>Not found!</h3>}
        <Outlet />
      </ContentWrapper>
      <SelectAmount />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        loading={loading}
      />
    </div>
  );
}
