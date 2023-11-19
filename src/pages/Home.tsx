/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ContentWrapper, SearchWrapper } from '../components/UI/Styles';
import MyInput from '../components/UI/MyInput/MyInput';
import MyButton from '../components/UI/MyButton/MyButton';
import Pagination from '../components/UI/Pagination/Pagination';
import SelectAmount from '../components/UI/SelectAmount';
import CardList from '../components/CardList/CardList';
import { RootState } from '../store/store';
import { changeSearchValue } from '../store/searchValue/searchValue.slice';
import { changePostsAmount } from '../store/postsPerPage/postsPerPage.slice';
import { useGetCardListQuery } from '../store/animeApi';

export default function Home() {
  const { value } = useSelector((state: RootState) => state.value);
  const postPerPage = useSelector((state: RootState) => state.postsPerPage);
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const [totalPosts, setTotalPosts] = useState(0);
  const location = useLocation();

  const { data, isLoading } = useGetCardListQuery({
    searchQuery: search.get('search') as string,
    pageQuery: search.get('page') as string,
    perPageQuery: search.get('limit') as string,
  });

  const handleInputChange = (event: { target: { value: string } }) => {
    dispatch(changeSearchValue(event.target.value));
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
    if (data) {
      setTotalPosts(data.pagination.items.total);
      dispatch(changePostsAmount(data.pagination.items.per_page));
    }
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
    }
  }, [data, dispatch, location.pathname.length, search, setSearch]);

  return (
    <div>
      <SearchWrapper>
        <MyInput change={handleInputChange} />
        <MyButton click={handleSearchStart} color="blue" message="Search" />
      </SearchWrapper>
      <h2>Results:</h2>
      <ContentWrapper>
        {isLoading && (
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
        {!isLoading && <CardList />}
        <Outlet />
      </ContentWrapper>
      <SelectAmount />
      <Pagination
        postsPerPage={postPerPage.value}
        totalPosts={totalPosts}
        loading={isLoading}
      />
    </div>
  );
}
