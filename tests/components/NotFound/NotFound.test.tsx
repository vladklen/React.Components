import { describe, expect, test } from 'vitest';
import { createMockRouter } from '../../mocks/mockRouter';
import { render } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import NotFound from '@/components/NotFound/NotFound';

describe('Test 404 page', () => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const routerParamsMock = {
      pathname: '/test',
      query: {
        page: '1',
      },
    };
    const mockRouter = createMockRouter(routerParamsMock);

    const wrapper = render(
      <RouterContext.Provider value={mockRouter}>
        <NotFound />
      </RouterContext.Provider>
    );

    expect(wrapper.getByText(/Page not found!/i)).toBeTruthy();
    expect(wrapper.getByRole('link', { name: /Home/i })).toBeTruthy();
  });
});
