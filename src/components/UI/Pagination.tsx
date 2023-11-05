/* eslint-disable no-restricted-syntax */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IPaginationProps {
  postsPerPage: number;
  totalPosts: number;
  loading: boolean;
}

export default function Pagination(props: IPaginationProps) {
  const [search, setSearch] = useSearchParams();
  const { postsPerPage, totalPosts, loading } = props;
  const [activePage, setActivePage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const changePage = (page: number) => {
    setActivePage(page);
    let params = {};
    for (const [key, value] of search) {
      params = { ...params, [key]: value, page };
    }
    setSearch(params);
  };
  if (loading) {
    return null;
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              type="button"
              style={{ backgroundColor: activePage === page ? 'blue' : 'grey' }}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
