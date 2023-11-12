import { ChangeEventHandler, useContext } from 'react';
import { StyledInput } from './Styles';
import { AppContext } from '../../../context/Context';

interface IInputProps {
  change: ChangeEventHandler<HTMLInputElement>;
}

export default function MyInput({ change }: IInputProps) {
  const { value } = useContext(AppContext);
  return <StyledInput type="text" defaultValue={value} onChange={change} />;
}
