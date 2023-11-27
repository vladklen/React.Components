/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Colors } from '../Styles';

const StyledInput = styled.input<{ $inputColor?: string }>`
  width: 80%;
  height: 35px;
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.$inputColor || Colors.mainColor};
  background: ${Colors.background}
  border: none;
  border-radius: 3px;
`;

export { StyledInput };
