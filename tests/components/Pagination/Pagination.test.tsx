import { RenderResult, act, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Pagination from '../../../src/components/UI/Pagination/Pagination';
import { paginationProps } from '../../mocks/AnimeRespone';
import { renderWithProviders } from '../../utils/test-utils';

const CURRENT_PAGE = '5';
const CLICK_PAGE = 3;

const history = createMemoryHistory();

vi.mock('react-router-dom', async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => {
      const setSearch = (url: { page: string }) =>
        history.push({
          search: `page=${url.page}`,
        });
      const search = {
        get: () => CURRENT_PAGE,
        *[Symbol.iterator]() {
          yield ['page', `${CURRENT_PAGE}`];
        },
      };
      return [search, setSearch];
    },
  };
});

describe('Pagination tests', () => {
  let wrapper: RenderResult;
  beforeEach(() => {
    wrapper = renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Pagination {...paginationProps} />
      </Router>
    );
  });

  test('Updates URL query parameter when click next page', async () => {
    const el = await wrapper.findByText(`${CLICK_PAGE}`);
    act(() => {
      fireEvent.click(el);
    });
    expect(history.location.search).toBe(`page=${CLICK_PAGE}`);
  });
});
