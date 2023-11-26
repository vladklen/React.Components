import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useRouter } from 'next/router';
import { ContentWrapper, SearchWrapper } from '../components/UI/Styles';
import CardList from '../components/CardList/CardList';
import { wrapper } from '../store/store';
import {
  getCardById,
  getCardList,
  getRunningQueriesThunk,
} from '../store/animeApi';
import { IDataState } from '../types/types';

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

export default function Home(data: IDataState) {
  console.log(data);
  const { list, details } = data;
  const router = useRouter();
  const { pathname, query } = router;
  const [inputSearch, setInputSearch] = useState(query.search || '');

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

  return (
    <div>
      {/* <SearchWrapper>
        <MyInput change={handleInputChange} value={inputSearch} />
        <MyButton click={handleSearchStart} color="blue" message="Search" />
      </SearchWrapper> */}
      <h2>Results:</h2>
      <ContentWrapper>
        {/* {isFetching && (
          <ColorRing
            visible
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        )} */}
        {/* {!isFetching && <CardList data={data} />} */}
        <CardList {...list} />
      </ContentWrapper>
      {/* <SelectAmount /> */}
      {/* <Pagination postsPerPage={postPerPage.value} /> */}
    </div>
  );
}
