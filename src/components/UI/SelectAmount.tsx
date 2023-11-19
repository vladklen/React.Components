/* eslint-disable no-restricted-syntax */
import { SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { StyledSelect } from './Styles';
import { changePostsAmount } from '../../store/postsPerPage/postsPerPage.slice';

const OPTIONS = [
  { value: 1, label: '1' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
];

export default function SelectAmount() {
  const [search, setSearch] = useSearchParams();
  const dispatch = useDispatch();

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    let params = {};
    for (const [key, value] of search) {
      params = { ...params, [key]: value, limit: event.target.value };
    }
    dispatch(changePostsAmount(Number(event.target.value)));

    setSearch(params);
  };

  return (
    <StyledSelect>
      <select
        value={search.get('limit') || OPTIONS[2].value}
        onChange={handleChange}
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </StyledSelect>
  );
}
