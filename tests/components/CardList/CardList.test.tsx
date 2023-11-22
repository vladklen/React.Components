import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import CardList, {
  TEXT_CONTENT,
} from '../../../src/components/CardList/CardList';
import { data } from '../../mocks/AnimeRespone';
import { renderWithProviders } from '../../utils/test-utils';
import { handlerNoData, handlerWithData } from '../../mocks/node';

describe('Test CardList component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    const server = setupServer(...handlerWithData);
    server.listen();
    const wrapper = renderWithProviders(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    const items = await wrapper.findAllByRole('link');
    expect(items.length).toBe(data.length);
    server.close();
  });

  test('Verify that the component renders the specified number of cards', () => {
    const server = setupServer(...handlerNoData);
    server.listen();
    const wrapper = renderWithProviders(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );
    const item = wrapper.queryByText(TEXT_CONTENT.ERROR);
    expect(item).not.toBeFalsy();
    server.close();
  });
});
