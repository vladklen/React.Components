/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import MyInput from './components/UI/MyInput';
import MyButton from './components/UI/MyButton';

interface IState {
  text: string;
  content: [];
}

class App extends Component<IState> {
  // eslint-disable-next-line react/state-in-constructor
  state: IState = {
    text: 'Test',
    content: [],
  };

  componentDidMount() {
    this.loadContent();
  }

  componentDidUpdate(): void {
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.state.content);
  }

  loadContent = () => {
    const { text } = this.state;
    console.log('делаем запрос');
    fetch(`https://swapi.dev/api/people/?search=${text}`)
      .then((response) => response.json())
      .then((data) => this.setState({ content: data.results }));
  };

  startSearch = () => {
    this.loadContent();
  };

  handleInputChange = (event: { target: { value: unknown } }) => {
    console.log(event.target.value);
    const myValue = event.target.value;
    this.setState({
      text: myValue,
    });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <div>
          <MyInput message={text} change={this.handleInputChange} />
          <MyButton click={this.startSearch} message="Search" />
        </div>
        <div>
          <p>Results:</p>
        </div>
      </div>
    );
  }
}

export default App;
