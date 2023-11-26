import { SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { StyledSelect } from '../Styles';
import { changePostsAmount } from '../../../store/postsPerPage/postsPerPage.slice';

const OPTIONS = [
  { value: 1, label: '1' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
];

export default function SelectAmount() {
  const router = useRouter();
  const { query } = router;

  const dispatch = useDispatch();

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const limit = event.target.value;
    dispatch(changePostsAmount(Number(limit)));

    query.limit = `${limit}`;
  };

  return (
    <StyledSelect>
      <select value={query.limit || OPTIONS[2].value} onChange={handleChange}>
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </StyledSelect>
  );
}
