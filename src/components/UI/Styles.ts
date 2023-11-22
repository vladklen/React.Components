import styled from 'styled-components';

export const Colors = {
  mainColor: '#BF4F74',
  secondColor: '#00897B',
  background: 'papayawhip',
  text_green: '#00897b',
};

const ContentWrapper = styled.div`
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
  align-items: center;
  h3,
  p {
    color: black;
  }
`;

const StyledSelect = styled.div`
  text-align: center;
`;

export { ContentWrapper, SearchWrapper, ModalWrapper, StyledSelect };
