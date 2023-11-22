import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { Colors } from '../Styles';

const StyledPaginate = styled(ReactPaginate)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  list-style-type: none;
  li.active a {
    background-color: ${Colors.background};
  }
  li:hover {
    background-color: ${Colors.text_green};
    border-radius: 0.5rem;
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
    border: 2px solid ${Colors.mainColor};
    cursor: pointer;
    min-height: 2rem;
    line-height: normal;
    border-radius: 0.5rem;
    min-width: 3rem;
    height: 2rem;
    padding: 5px 0px;
    &:hover {
      color: white;
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { StyledPaginate };
