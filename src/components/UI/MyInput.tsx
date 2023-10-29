/* eslint-disable react/destructuring-assignment */
import React, { ChangeEventHandler } from 'react';
import { StyledInput } from './Styles';

interface IInputState {
  message: string;
  change: ChangeEventHandler<HTMLInputElement>;
}

class MyInput extends React.Component<IInputState> {
  render(): JSX.Element {
    return (
      <StyledInput
        type="text"
        defaultValue={this.props.message}
        onChange={this.props.change}
      />
    );
  }
}

export default MyInput;
