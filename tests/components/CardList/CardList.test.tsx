import { describe, expect, test } from 'vitest';
import CardList, {
  TEXT_CONTENT,
} from '../../../src/components/CardList/CardList';
import { data, failResponse, response } from '../../mocks/AnimeRespone';
import { createRouterProvider } from '../../mocks/mockRouter';
import { render } from '@testing-library/react';

describe('Test CardList component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    const RouterProvider = createRouterProvider();
    const wrapper = render(
      <RouterProvider>
        <CardList {...response} />
      </RouterProvider>
    );
    const items = await wrapper.findAllByTestId('card');
    expect(items.length).toBe(data.length);
  });

  test('Verify that the component renders the specified number of cards', () => {
    const RouterProvider = createRouterProvider();
    const wrapper = render(
      <RouterProvider>
        <CardList {...failResponse} />
      </RouterProvider>
    );

    const item = wrapper.queryByText(TEXT_CONTENT.ERROR);
    expect(item).not.toBeFalsy();
  });
});
