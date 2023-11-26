import { useState } from 'react';
import { useRouter } from 'next/router';
import { StyledPaginate } from './Styles';
import { IDataResponse } from '@/types/types';

export interface IPaginationProps {
  posts: number;
}

export default function Pagination(list: IDataResponse) {
  const router = useRouter();
  const { query, pathname } = router;
  const [postsPerPage] = useState(query.limit || '10');
  const [activePage, setActivePage] = useState(0);
  const [totalPosts] = useState(list.pagination.items.total);
  const pageNumbers = Math.ceil(totalPosts / Number(postsPerPage));

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected;
    setActivePage(page);
    query.page = `${page + 1}`;
    router.push({ pathname, query: { ...query, page: page + 1 } }, undefined, {
      scroll: false,
    });
  };

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
