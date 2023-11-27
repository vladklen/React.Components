import { describe, expect, test } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Main from '@/components/Main/Main';
import { data, response } from '../../mocks/AnimeRespone';
import { createRouterProvider } from '../../mocks/mockRouter';
import { IDataState } from '@/types/types';

describe('Test Card component', () => {
  test('Test Home component render', async () => {
    const RouterProvider = createRouterProvider();
    const getData: IDataState = {
      list: response,
      details: data[1],
    };
    const wrapper = render(
      <RouterProvider>
        <Main {...getData} />
      </RouterProvider>
    );

    const items = await wrapper.findAllByTestId('card');

    expect(items.length).toBe(3);
  });

  test('Ensure that the card component renders the relevant card data;', async () => {
    const RouterProvider = createRouterProvider();
    const getData: IDataState = {
      list: response,
      details: data[1],
    };
    const wrapper = render(
      <RouterProvider>
        <Main {...getData} />
      </RouterProvider>
    );

    const items = await wrapper.findAllByTestId('card');

    expect(items[0]).toMatchSnapshot();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const RouterProvider = createRouterProvider();
    const getData: IDataState = {
      list: response,
      details: data[0],
    };
    const wrapper = render(
      <RouterProvider>
        <Main {...getData} />
      </RouterProvider>
    );
    const linkElement = await wrapper.findByTestId(`card_${data[0].mal_id}`);

    await waitFor(() => {
      fireEvent.click(linkElement);
      expect(wrapper.findByTestId(`cardDetails${data[0].mal_id}`)).toBeTruthy();
    });
  });
});
