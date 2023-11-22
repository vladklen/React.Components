import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

// pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// components
import PersonDetails from './components/PersonalCard/PersonDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}>
        <Route path="details/:id" element={<PersonDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
