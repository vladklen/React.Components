import { ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { StyledInput } from './Styles';
import { RootState } from '../../../store/store';

interface IInputProps {
  change: ChangeEventHandler<HTMLInputElement>;
}

export default function MyInput({ change }: IInputProps) {
  const { value } = useSelector((state: RootState) => state.value);
  return <StyledInput type="text" defaultValue={value} onChange={change} />;
}
