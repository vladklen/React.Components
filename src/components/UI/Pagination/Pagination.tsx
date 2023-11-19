import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StyledPaginate } from './Styles';
import { useGetCardListQuery } from '../../../store/animeApi';
import { changePostsAmount } from '../../../store/postsPerPage/postsPerPage.slice';
import { RootState } from '../../../store/store';

export interface IPaginationProps {
  postsPerPage: number;
}

export default function Pagination(props: IPaginationProps) {
  const [search, setSearch] = useSearchParams();
  const { postsPerPage } = props;
  const [activePage, setActivePage] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);
  const dispatch = useDispatch();

  const { value } = useSelector((state: RootState) => state.value);
  const { data, isLoading } = useGetCardListQuery(value);

  useEffect(() => {
    if (data) {
      setTotalPosts(data.pagination.items.total);
      dispatch(changePostsAmount(data.pagination.items.per_page));
    }
  }, [data, dispatch, search, setSearch, value]);

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected;
    setActivePage(page);
    setSearch({ ...value, page: `${page + 1}` });
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
