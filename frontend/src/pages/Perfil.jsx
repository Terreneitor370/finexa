import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Perfil = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('Alejandro García');
  const [telefono, setTelefono] = useState('+34 600 000 000');
  const [moneda, setMoneda] = useState('EUR (€) - Euro');

  const monedas = [
    'EUR (€) - Euro',
    'USD ($) - Dólar Americano',
    'MXN ($) - Peso Mexicano',
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-8 pb-4 border-b border-gray-100">
        <h1 className="text-3xl font-light text-gray-900">Perfil</h1>
      </div>

      <div className="px-6 py-3 text-xs text-gray-400 border-b border-gray-100">
        Dashboard / Perfil
      </div>

      <div className="px-6 py-8">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-gray-500 text-lg">AG</span>
            </div>
            <p className="text-gray-900 font-medium">{nombre}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 text-xs mb-1 tracking-wide">
              NOMBRE COMPLETO
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full text-gray-900 border-b border-gray-200 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1 tracking-wide">
              TELÉFONO
            </label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full text-gray-900 border-b border-gray-200 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs mb-1 tracking-wide">
              TIPO DE MONEDA
            </label>
            <select
              value={moneda}
              onChange={(e) => setMoneda(e.target.value)}
              className="w-full text-gray-900 border-b border-gray-200 py-2 outline-none bg-transparent"
            >
              {monedas.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-md text-sm font-medium mt-8">
            Guardar Cambios
          </button>

          {/* Cerrar Sesión - más visible */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-md text-sm font-medium mt-4 hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
        <div className="flex justify-around items-center py-3">
          <Link to="/dashboard" className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Dashboard</span>
          </Link>
          <Link to="/historial" className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Historial</span>
          </Link>
          <Link to="/perfil" className="flex flex-col items-center">
            <span className="text-gray-900 text-sm font-medium">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Perfil;