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
    const { color } = this.props;
    const { clickHandler, buttonText } = this.state;
    return (
      <StyledButton type="button" $inputColor={color} onClick={clickHandler}>
        {buttonText}{' '}
      </StyledButton>
    );
  }
}

export default MyButton;
