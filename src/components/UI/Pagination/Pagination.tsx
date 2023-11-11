/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
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
  const [activePage, setActivePage] = useState(0);
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  useEffect(() => {
    setActivePage(Number(search.get('page')) - 1);
  }, [search]);

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
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageNumbers}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
