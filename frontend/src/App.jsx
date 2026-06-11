import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Historial from './pages/Historial';
import AgregarGasto from './pages/AgregarGasto';
import Perfil from './pages/Perfil';
import ResetPassword from './pages/ResetPassword';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/agregar-gasto" element={<AgregarGasto />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;