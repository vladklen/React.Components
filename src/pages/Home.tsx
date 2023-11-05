/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { ContentWrapper, SearchWrapper } from '../components/UI/Styles';
import MyInput from '../components/UI/MyInput';
import MyButton from '../components/UI/MyButton';
import { Card, CardProps } from '../components/Сard';
import Pagination from '../components/UI/Pagination';
import SelectAmount from '../components/UI/SelectAmount';

export default function Home() {
  const [search, setSearch] = useSearchParams();
  const [text, setText] = useState(localStorage.getItem('test') ?? '');
  const [totalPosts, setTotalPosts] = useState(0);
  const [postsPerPage] = useState(10);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  let myValue = '';

  const handleInputChange = (event: { target: { value: string } }) => {
    myValue = event.target.value;
    localStorage.setItem('test', myValue);
  };

  const modalWindowHandler = () => {};

  const handleSearchStart = () => {
    setText(myValue);
    let params = {};
    for (const [key, value] of search) {
      params = { ...params, [key]: value, page: '1', search: myValue };
    }
    setSearch(params);
  };

  useEffect(() => {
    if (cardOpen) {
      return;
    }
    if (!search.get('search') && !search.get('page') && !search.get('limit')) {
      if (localStorage.getItem('test')) {
        setSearch({ search: String(localStorage.getItem('test')), page: '1' });
      }
      setSearch({ search: '', page: '1', limit: '10' });
      return;
    }
    const startSearch = async () => {
      setLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${search.get(
          'search'
        )}&page=${search.get('page')}`
      );
      const data = await response.json();
      setLoading(false);
      setTotalPosts(data.count);
      setContent(data.results);
    };
    startSearch();
  }, [search, setSearch]);

  return (
    <div>
      <SearchWrapper>
        <MyInput message={text} change={handleInputChange} />
        <MyButton click={handleSearchStart} color="blue" message="Search" />
      </SearchWrapper>
      <h2>Results:</h2>
      <ContentWrapper onClick={modalWindowHandler}>
        {loading && (
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
        <div>
          {content.length && !loading
            ? content.map((el: CardProps) => (
                <Link
                  to={`details/${el.name.toString()}`}
                  key={el.name}
                  onClick={() => setCardOpen(true)}
                >
                  <Card
                    key={el.name}
                    name={el.name}
                    birth_year={el.birth_year}
                    height={el.height}
                    mass={el.mass}
                    gender={el.gender}
                  />
                </Link>
              ))
            : !loading && <h3>Not found!</h3>}
        </div>
        <Outlet />
      </ContentWrapper>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        loading={loading}
      />
      <SelectAmount />
    </div>
  );
}
