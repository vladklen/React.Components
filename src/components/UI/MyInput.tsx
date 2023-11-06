import { ChangeEventHandler } from 'react';
import { StyledInput } from './Styles';

interface IInputProps {
  message: string;
  change: ChangeEventHandler<HTMLInputElement>;
}

export default function MyInput({ message, change }: IInputProps) {
  return <StyledInput type="text" defaultValue={message} onChange={change} />;
}
