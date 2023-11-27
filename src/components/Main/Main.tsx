/* eslint-disable react/destructuring-assignment */
import {
  getCardList,
  getCardById,
  getRunningQueriesThunk,
} from '@/store/animeApi';
import { wrapper } from '@/store/store';
import { IDataState } from '@/types/types';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SearchWrapper, ContentWrapper } from '@/components/UI/Styles';
import CardList from '../CardList/CardList';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';
import SelectAmount from '../UI/SelectAmount/SelectAmount';
import Pagination from '../UI/Pagination/Pagination';
import PersonDetails from '../PersonalCard/PersonDetails';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { page, search, limit, details } = context.query;

    store.dispatch(
      getCardList.initiate({
        search: search?.toString() || '',
        page: page?.toString() || '1',
        limit: limit?.toString() || '10',
      })
    );

    if (details) {
      store.dispatch(getCardById.initiate(details.toString()));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        list: store.getState().data.list,
        details: store.getState().data.details,
      },
    };
  });

export default function Main(data: IDataState) {
  const { list, details } = data;
  const router = useRouter();
  const { pathname, query } = router;
  const [inputSearch, setInputSearch] = useState(
    query.search ? query.search : ''
  );
  const id = query.details;

  const handleInputChange = (event: { target: { value: string } }) => {
    localStorage.setItem('test', event.target.value);
    setInputSearch(event.target.value);
  };

  const handleSearchStart = () => {
    query.search = inputSearch;
    router.push(
      { pathname, query: { ...query, search: inputSearch } },
      undefined,
      {
        scroll: false,
      }
    );
  };

  const handleCloseDetails = () => {
    delete query.details;
    router.push({ pathname, query: { ...query } }, undefined, {
      scroll: false,
    });
  };

  return (
    <div>
      <SearchWrapper>
        <MyInput change={handleInputChange} value={inputSearch as string} />
        <MyButton click={handleSearchStart} color="blue" message="Search" />
      </SearchWrapper>
      <h2>Results:</h2>
      <ContentWrapper>
        <CardList {...list} />
        {id && data.details ? (
          <PersonDetails {...details} closeHandler={handleCloseDetails} />
        ) : null}
      </ContentWrapper>
      <SelectAmount />
      <Pagination {...list} />
    </div>
  );
}
