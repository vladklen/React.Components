import React from 'react';

interface CardProps {
  name: string;
  birth: string;
  height: string;
  mass: string;
  gender: string;
}

// eslint-disable-next-line react/prefer-stateless-function
class MyInput extends React.Component<CardProps> {
  render(): JSX.Element {
    const { name, birth, height, mass, gender } = this.props;
    return (
      <div>
        <h3>{name}</h3>
        <p>{birth}</p>
        <p>{height}</p>
        <p>{mass}</p>
        <p>{gender}</p>
      </div>
    );
  }
}

export default MyInput;
