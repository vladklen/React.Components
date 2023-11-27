import { GetServerSideProps } from 'next';
import Main from '@/components/Main/Main';
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
  return <Main {...data} />;
}
