import React from 'react';
import { StyledButton } from './Styles';

interface IButtonProps {
  message: string;
  color: string;
  dataTest?: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MyButton({
  message,
  color,
  click,
  dataTest,
}: IButtonProps) {
  return (
    <StyledButton
      type="button"
      $inputColor={color}
      onClick={click}
      data-testid={dataTest}
    >
      {message}{' '}
    </StyledButton>
  );
}
