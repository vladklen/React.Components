/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { Colors } from '../Styles';

const StyledButton = styled.button<{ $inputColor?: string }>`
  color: ${Colors.secondColor};
  font-size: 1em;
  margin: 1em;
  background-color: none;
  padding: 0.8em 1.3em;
  border: 2px solid ${Colors.secondColor};
  border-radius: 3px;
`;

export { StyledButton };
