import React from 'react';

interface CardProps {
  name: string;
  birth: string;
  height: string;
  mass: string;
  gender: string;
}

class Card extends React.PureComponent<CardProps> {
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

export { Card };
export type { CardProps };
