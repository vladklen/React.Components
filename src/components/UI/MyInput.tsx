import React, { ChangeEventHandler } from 'react';
import { StyledInput } from './Styles';

interface IInputState {
  message: string;
  change: ChangeEventHandler<HTMLInputElement>;
}

class MyInput extends React.PureComponent<IInputState> {
  render(): JSX.Element {
    const { message, change } = this.props;
    return <StyledInput type="text" defaultValue={message} onChange={change} />;
  }
}

export default MyInput;
