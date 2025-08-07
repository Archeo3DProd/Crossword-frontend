import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Grids from '../pages/Grids';
import { CrosswordGrid } from '../components/CrosswordGrid';
import AdminDashboard from '../admin/AdminDashboard';
import NewGridForm from '../admin/NewGridForm';
import EditGrid from '../admin/EditGrid'; // à venir

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/grids' element={<Grids />} />
      <Route path='/grids/:id' element={<CrosswordGrid />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/new" element={<NewGridForm />} />
      <Route path="/admin/edit/:id" element={<EditGrid />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
