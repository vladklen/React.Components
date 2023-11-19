import { SetStateAction } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StyledSelect } from './Styles';
import { changePostsAmount } from '../../store/postsPerPage/postsPerPage.slice';
import { RootState } from '../../store/store';

const OPTIONS = [
  { value: 1, label: '1' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
];

export default function SelectAmount() {
  const [search, setSearch] = useSearchParams();
  const { value } = useSelector((state: RootState) => state.value);
  const dispatch = useDispatch();

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const limit = event.target.value;
    dispatch(changePostsAmount(Number(limit)));

    setSearch({ ...value, limit: `${limit}` });
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
