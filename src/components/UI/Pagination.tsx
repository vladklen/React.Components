/* eslint-disable no-restricted-syntax */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { StyledPaginate } from './Styles';

interface IPaginationProps {
  postsPerPage: number;
  totalPosts: number;
  loading: boolean;
}

export default function Pagination(props: IPaginationProps) {
  const [search, setSearch] = useSearchParams();
  const { postsPerPage, totalPosts, loading } = props;
  const [activePage, setActivePage] = useState(1);
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected;
    let params = {};
    for (const [key, value] of search) {
      params = { ...params, [key]: value, page: page + 1 };
    }
    setActivePage(page);
    setSearch(params);
  };

  if (loading) {
    return null;
  }

  return (
    <StyledPaginate
      activeClassName="active"
      forcePage={activePage}
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageNumbers}
      previousLabel="< prev"
      renderOnZeroPageCount={null}
    />
  );
}
