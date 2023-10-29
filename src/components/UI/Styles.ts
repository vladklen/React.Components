import styled from 'styled-components';

const StyledButton = styled.button<{ $inputColor?: string }>`
  color: ${(props) => props.$inputColor || '#BF4F74'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => props.$inputColor || '#BF4F74'};
  border-radius: 3px;
`;

const StyledInput = styled.input<{ $inputColor?: string }>`
  width: 500px;
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.$inputColor || '#BF4F74'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 10px;
  background-color: papayawhip;
  color: #bf4f74;
  width: 300px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export { StyledButton, StyledInput, StyledCard, ContentWrapper, SearchWrapper };
