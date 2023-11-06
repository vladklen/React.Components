import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

// const backgroundColor = '#bdc1c6';
const mainColor = '#BF4F74';
const secondColor = '#00897B';

const StyledButton = styled.button<{ $inputColor?: string }>`
  color: ${secondColor};
  font-size: 1em;
  margin: 1em;
  background-color: none;
  padding: 0.8em 1.3em;
  border: 2px solid ${secondColor};
  border-radius: 3px;
`;

const StyledInput = styled.input<{ $inputColor?: string }>`
  width: 80%;
  height: 35px;
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.$inputColor || mainColor};
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
  color: ${mainColor};
  width: 300px;
  height: 300px;
  padding: 0px 0px 20px 0px;
  &:hover {
    transform: scale(1.03);
  }
`;

const StyledPersonalCard = styled.div`
  height: 100%;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 10px;
  background-color: grey;
  color: ${mainColor};
  padding: 0px 0px 20px 0px;
  img {
    width: 100%;
    height: 50%;
    object-fit: cover;
  }
`;

const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  list-style-type: none;
  li.active a {
    background-color: papayawhip;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: #bf4f74;
    text-transform: uppercase;
    transition: all 0.3s;
    border: 2px solid ${mainColor};
    cursor: pointer;
    min-height: 2rem;
    line-height: normal;
    border-radius: 0.5rem;
    min-width: 3rem;
    height: 2rem;
    padding: 5px 0px;
  }
`;

const ContentWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  color: black;
  h3,
  p {
    color: black;
  }
`;

const StyledSelect = styled.div`
  text-align: center;
`;

export {
  StyledButton,
  StyledInput,
  StyledCard,
  ContentWrapper,
  SearchWrapper,
  ModalWrapper,
  StyledPaginate,
  StyledPersonalCard,
  StyledSelect,
};
