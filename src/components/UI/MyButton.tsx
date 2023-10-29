/* eslint-disable react/destructuring-assignment */
import React from 'react';

interface IButtonProps {
  message: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
}

interface IButtonState {
  buttonText: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

class MyButton extends React.Component<IButtonProps, IButtonState> {
  constructor(props: IButtonProps) {
    super(props);
    this.state = {
      buttonText: props.message,
      clickHandler: props.click,
    };
  }

  render(): JSX.Element {
    return (
      <button type="button" onClick={this.state.clickHandler}>
        {this.state.buttonText}{' '}
      </button>
    );
  }
}

export default MyButton;
