import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './pages/Home';
import { PathConstants } from './routes/PathConstants';
import { FirstForm } from './pages/FirstForm';
import { SecondForm } from './pages/SecondForm';
import NoPage from './pages/NoPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={PathConstants.FIRST_FORM} element={<FirstForm />} />
          <Route path={PathConstants.SECOND_FORM} element={<SecondForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
