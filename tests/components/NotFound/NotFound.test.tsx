import { describe, expect, test } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from '../../../src/pages';
import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
import NotFound from '../../../src/pages/NotFound';
import { renderWithProviders } from '../../utils/test-utils';

describe('Test 404 page', () => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const wrapper = renderWithProviders(
      <MemoryRouter initialEntries={['/error']}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="details/:id" element={<PersonDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await wrapper.findByText(`Page not found!`)).toBeTruthy();
  });
});
