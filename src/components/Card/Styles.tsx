import styled from 'styled-components';
import { Colors } from '../UI/Styles';

const StyledCard = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 2px solid white;
  border-radius: 10px;
  background-color: papayawhip;
  color: ${Colors.mainColor};
  width: 300px;
  height: 350px;
  padding: 20px;
  transition: transform 0.4s;
  cursor: pointer;
  &:hover {
    transform: scale(1.03);
    box-shadow:
      0px 3px 6px rgba(0, 0, 0, 0.4),
      0px 3px 6px rgba(0, 0, 0, 0.5);
  }
  h3 {
    height: 10px;
    overflow: visible;
  }
`;

const StyledCardPreview = styled.div`
  min-height: 200px;
  width: 150px;
  background-size: cover;
  border-radius: 5px;
`;

export { StyledCard, StyledCardPreview };
