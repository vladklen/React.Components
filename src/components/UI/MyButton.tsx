/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { StyledButton } from './Styles';

interface IButtonProps {
  message: string;
  color: string;
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
      <StyledButton
        type="button"
        $inputColor={this.props.color}
        onClick={this.state.clickHandler}
      >
        {this.state.buttonText}{' '}
      </StyledButton>
    );
  }
}

export default MyButton;
