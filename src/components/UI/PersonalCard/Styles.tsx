import styled from 'styled-components';
import { Colors } from '../Styles';

const StyledPersonalCard = styled.div`
  max-height: 600px;
  padding: 30px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid ${Colors.mainColor};
  border-radius: 10px;
  background-color: white;
  color: ${Colors.mainColor};
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.4),
    0px 3px 6px rgba(0, 0, 0, 0.5);
`;

const StyledPersonalCardContent = styled.div`
  height: 350px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  button {
    margin: 0px;
  }
`;

export { StyledPersonalCard, StyledPersonalCardContent };
