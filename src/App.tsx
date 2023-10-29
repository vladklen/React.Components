import { Component } from 'react';
import { ColorRing } from 'react-loader-spinner';
import MyInput from './components/UI/MyInput';
import MyButton from './components/UI/MyButton';
import { Card, CardProps } from './components/Сard';
import { ContentWrapper, SearchWrapper } from './components/UI/Styles';

interface IState {
  text: string;
  content: CardProps[];
  loading: boolean;
}

class App extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      text: localStorage.getItem('test') ?? '',
      content: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.startSearch();
  }

  componentDidUpdate(): void {
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.state.content);
  }

  startSearch = async () => {
    const { text } = this.state;
    this.setState({ loading: true });
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${text}`
    );
    const data = await response.json();
    this.setState({ content: data.results, loading: false });
  };

  handleInputChange = (event: { target: { value: string } }) => {
    const myValue = event.target.value;
    localStorage.setItem('test', myValue);
    this.setState({
      text: myValue,
    });
  };

  // eslint-disable-next-line class-methods-use-this
  throwError = async () => {
    try {
      await Promise.reject();
    } catch (error) {
      this.setState(() => {
        throw error;
      });
    }
  };

  render() {
    const { text, content, loading } = this.state;
    console.log(content);

    return (
      <div>
        <SearchWrapper>
          <MyInput message={text} change={this.handleInputChange} />
          <MyButton click={this.startSearch} color="blue" message="Search" />
          <MyButton click={this.throwError} color="red" message="Error Test" />
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
            ? content.map((el) => (
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
}

export default App;
