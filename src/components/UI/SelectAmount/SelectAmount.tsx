import { useState } from 'react';
import { useRouter } from 'next/router';
import { StyledSelect } from '../Styles';

const OPTIONS = [
  { value: 1, label: '1' },
  { value: 5, label: '5' },
  { value: 10, label: '10' },
];

export default function SelectAmount() {
  const router = useRouter();
  const { pathname, query } = router;
  const [, setLimit] = useState(query.limit || '10');

  const handleChange = (event: { target: { value: string } }) => {
    setLimit(event.target.value);
    query.limit = `${event.target.value}`;
    router.replace(
      { pathname, query: { ...query, limit: event.target.value } },
      undefined,
      {
        scroll: false,
      }
    );
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
