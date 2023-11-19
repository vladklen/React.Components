// import { describe, expect, test, vi } from 'vitest';
// import { act, fireEvent, render } from '@testing-library/react';
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

// describe('Test Search component', () => {
//   test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
//     const wrapper = render(
//       <MemoryRouter>
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

//     const input = await wrapper.findByRole('textbox');

//     act(() => {
//       fireEvent.change(input, { target: { value: 'test value' } });
//     });

//     const localStorageData = localStorage.getItem('test');

//     expect(localStorageData).toBe('test value');
//   });

//   test('Check that the component retrieves the value from the local storage upon mounting', async () => {
//     localStorage.setItem('test', 'test value');

//     const wrapper = render(
//       <MemoryRouter>
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

//     const input = (await wrapper.findByRole('textbox')) as HTMLInputElement;

//     expect(input.value).toBe('test value');
//   });
// });
