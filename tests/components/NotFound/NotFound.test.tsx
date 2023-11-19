// import { describe, expect, test, vi } from 'vitest';
// import { render } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';

// import Home from '../../../src/pages/Home';
// import { data, pagination } from '../../mocks/AnimeRespone';
// import AnimeContextProvider from '../../../src/context/Context';
// import PersonDetails from '../../../src/components/PersonalCard/PersonDetails';
// import NotFound from '../../../src/pages/NotFound';

// vi.mock('../../../src/api/StartSearch', () => {
//   return {
//     getAnime: vi.fn(() => Promise.resolve({ data, pagination })),
//     getAnimeById: vi.fn(() => Promise.resolve({ data: data[0] })),
//   };
// });

// describe('Test 404 page', () => {
//   test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
//     const wrapper = render(
//       <MemoryRouter initialEntries={['/error']}>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <AnimeContextProvider>
//                 <Home />
//               </AnimeContextProvider>
//             }
//           >
//             <Route path="details/:id" element={<PersonDetails />} />
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     expect(await wrapper.findByText(`Page not found!`)).toBeTruthy();
//   });
// });
