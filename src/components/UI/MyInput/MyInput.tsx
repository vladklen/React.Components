import { ChangeEventHandler } from 'react';
import { StyledInput } from './Styles';

interface IInputProps {
  change: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export default function MyInput({ change, value }: IInputProps) {
  return <StyledInput type="text" value={value} onChange={change} />;
}
