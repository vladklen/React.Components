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
import { useGetCardListQuery } from '../store/animeApi';

export default function Home() {
  const { value } = useSelector((state: RootState) => state.value);
  const postPerPage = useSelector((state: RootState) => state.postsPerPage);
  const dispatch = useDispatch();
  const [search, setSearch] = useSearchParams();
  const location = useLocation();
  const [inputSearch, setInputSearch] = useState(value.search);

  const { isLoading } = useGetCardListQuery(value);

  const handleInputChange = (event: { target: { value: string } }) => {
    localStorage.setItem('test', event.target.value);
    setInputSearch(event.target.value);
  };

  const handleSearchStart = () => {
    setSearch({ ...value, search: inputSearch });
    // dispatch(changeSearchValue({ ...value, search: inputSearch }));
  };

  useEffect(() => {
    console.log(12312);
    if (!location.pathname.includes('details')) {
      dispatch(
        changeSearchValue({
          search: search.get('search') ?? value.search,
          page: search.get('page') || value.page,
          limit: search.get('limit') || value.limit,
        })
      );
    }
  }, [
    dispatch,
    location.pathname,
    search,
    value.limit,
    value.page,
    value.search,
  ]);

  return (
    <div>
      <SearchWrapper>
        <MyInput change={handleInputChange} value={inputSearch} />
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
      <Pagination postsPerPage={postPerPage.value} />
    </div>
  );
}
