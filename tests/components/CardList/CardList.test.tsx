import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useContext } from 'react';
import CardList, {
  TEXT_CONTENT,
} from '../../../src/components/CardList/CardList';
import { data } from '../../mocks/AnimeRespone';

vi.mock('react', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = await vi.importActual<any>('react');
  return {
    ...actual,
    useContext: vi.fn(() => ({ data })),
  };
});

describe('Test CardList component', () => {
  test('Verify that the component renders the specified number of cards', () => {
    vi.mocked(useContext).mockReturnValueOnce({ data });
    const wrapper = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    const items = wrapper.queryAllByRole('link');
    expect(items.length).toBe(data.length);
  });

  test('Verify that the component renders the specified number of cards', () => {
    vi.mocked(useContext).mockReturnValueOnce({ data: [] });
    const wrapper = render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    const item = wrapper.queryByText(TEXT_CONTENT.ERROR);
    expect(item).not.toBeFalsy();
  });
});
