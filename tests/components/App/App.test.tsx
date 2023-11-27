import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Home from '@/pages';
import { IDataState } from '@/types/types';
import { data, response } from '../../mocks/AnimeRespone';
import { createRouterProvider } from '../../mocks/mockRouter';

describe('App tests', () => {
  test('renders app', () => {
    const RouterProvider = createRouterProvider();
    const getData: IDataState = {
      list: response,
      details: data[0],
    };
    const wrapper = render(
      <RouterProvider>
        <Home {...getData} />
      </RouterProvider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
