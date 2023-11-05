import { useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import MyInput from './components/UI/MyInput';
import MyButton from './components/UI/MyButton';
import { Card, CardProps } from './components/Сard';
import { ContentWrapper, SearchWrapper } from './components/UI/Styles';

export default function App() {
  const [text, setText] = useState(localStorage.getItem('test') ?? '');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState();
  let myValue = '';

  const handleInputChange = (event: { target: { value: string } }) => {
    myValue = event.target.value;
    localStorage.setItem('test', myValue);
  };

  const handleSearchStart = () => {
    setText(myValue);
  };

  const throwError = async () => {
    try {
      await Promise.reject();
    } catch (err) {
      setError(() => {
        throw err;
      });
    }
  };

  useEffect(() => {
    const startSearch = async () => {
      setLoading(true);
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${text}`
      );
      const data = await response.json();
      setLoading(false);
      setContent(data.results);
    };
    startSearch();
  }, [text]);

  return (
    <div>
      <SearchWrapper>
        <MyInput message={text} change={handleInputChange} />
        <MyButton click={handleSearchStart} color="blue" message="Search" />
        <MyButton click={throwError} color="red" message="Error Test" />
      </SearchWrapper>
      <h2>Results:</h2>
      <ContentWrapper>
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
        {content.length && !loading
          ? content.map((el: CardProps) => (
              <Card
                key={el.name}
                name={el.name}
                birth_year={el.birth_year}
                height={el.height}
                mass={el.mass}
                gender={el.gender}
              />
            ))
          : !loading && <h3>Not found!</h3>}
      </ContentWrapper>
    </div>
  );
}
