/* eslint-disable react/no-unused-prop-types */
import { Component } from 'react';
import MyInput from './components/UI/MyInput';
import MyButton from './components/UI/MyButton';
import { Card } from './components/card';
import type { CardProps } from './components/card';

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

  render() {
    const { text, content, loading } = this.state;

    return (
      <div>
        <div>
          <MyInput message={text} change={this.handleInputChange} />
          <MyButton click={this.startSearch} message="Search" />
        </div>
        <div>
          <p>Results:</p>
          {loading && <p>Loading....</p>}
          {content.length && !loading
            ? content.map((el) => (
                <Card
                  key={el.name}
                  name={el.name}
                  birth={el.birth}
                  height={el.height}
                  mass={el.mass}
                  gender={el.gender}
                />
              ))
            : !loading && <div>Not found!</div>}
        </div>
      </div>
    );
  }
}

export default App;
