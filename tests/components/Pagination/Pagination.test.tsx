import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Pagination from '../../../src/components/UI/Pagination/Pagination';
import { response } from '../../mocks/AnimeRespone';
import { createMockRouter } from '../../mocks/mockRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

const CLICK_PAGE = 1;

describe('Pagination tests', () => {
  test('Updates URL query parameter when click next page', async () => {
    const routerParamsMock = {
      pathname: '/',
      query: { page: `` },
    };
    const mockRouter = createMockRouter(routerParamsMock);
    const wrapper = render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination {...response} />
      </RouterContext.Provider>
    );
    const el = await wrapper.findByText(`${CLICK_PAGE}`);
    fireEvent.click(el);
    console.log(mockRouter);
    expect(mockRouter).toMatchObject({
      pathname: '/',
      query: { page: `${CLICK_PAGE}` },
    });
  });
});
