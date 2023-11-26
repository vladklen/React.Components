import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { StyledPaginate } from './Styles';
import { getCardList, getRunningQueriesThunk } from '../../../store/animeApi';
import { changePostsAmount } from '../../../store/postsPerPage/postsPerPage.slice';
import { RootState, wrapper } from '../../../store/store';

export interface IPaginationProps {
  postsPerPage: number;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { page, search, limit } = context.query;

    store.dispatch(
      getCardList.initiate({
        search: search?.toString() || '1',
        page: page?.toString() || '',
        limit: limit?.toString() || '10',
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { data },
    };
  });

export default function Pagination(props: IPaginationProps) {
  const router = useRouter();
  const { query, pathname } = router;
  const { postsPerPage } = props;
  const [activePage, setActivePage] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);
  const dispatch = useDispatch();

  const { value } = useSelector((state: RootState) => state.value);

  useEffect(() => {
    if (data) {
      setTotalPosts(data.pagination.items.total);
      dispatch(changePostsAmount(data.pagination.items.per_page));
    }
  }, [data, dispatch, value]);

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected;
    setActivePage(page);
    query.page = `${page + 1}`;
    router.push({ pathname, query: { ...query } }, undefined, {
      scroll: false,
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <StyledPaginate
      activeClassName="active"
      forcePage={activePage}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageNumbers}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
