import React from 'react';
import { StyledButton } from './Styles';

interface IButtonProps {
  message: string;
  color: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MyButton({ message, color, click }: IButtonProps) {
  return (
    <StyledButton type="button" $inputColor={color} onClick={click}>
      {message}{' '}
    </StyledButton>
  );
}
