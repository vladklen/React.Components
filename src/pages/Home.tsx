/* eslint-disable no-restricted-syntax */
import { useContext, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { ContentWrapper, SearchWrapper } from '../components/UI/Styles';
import MyInput from '../components/UI/MyInput/MyInput';
import MyButton from '../components/UI/MyButton/MyButton';
import Pagination from '../components/UI/Pagination/Pagination';
import SelectAmount from '../components/UI/SelectAmount';
import { getAnime } from '../api/StartSearch';
import { AppContext } from '../context/Context';
import CardList from '../components/CardList/CardList';

export default function Home() {
  const { value, setValue, data, setData } = useContext(AppContext);
  const [search, setSearch] = useSearchParams();
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const handleInputChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
    localStorage.setItem('test', event.target.value);
  };

  const handleSearchStart = () => {
    let params = {};
    for (const [key, val] of search) {
      params = { ...params, [key]: val, page: '1', search: value };
    }
    setSearch(params);
  };

  useEffect(() => {
    const startSearch = async () => {
      setLoading(true);
      const response = await getAnime(search);
      setData(response.data);
      setPostsPerPage(response.pagination.items.per_page);
      setLoading(false);
      setTotalPosts(response.pagination.items.total);
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
      if (search.get('limit')) {
        let params = {};
        let limit: number = Number(search.get('limit'));
        if (limit > 5) {
          limit = 10;
        } else if (limit > 1) {
          limit = 5;
        } else {
          limit = 1;
        }
        for (const [key, val] of search) {
          params = { ...params, [key]: val, limit: `${limit}` };
        }
        setSearch(params);
      }
      startSearch();
    }
  }, [location.pathname.length, search, setData, setSearch]);

  return (
    <div>
      <SearchWrapper>
        <MyInput change={handleInputChange} />
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
        {!loading && <CardList />}
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
