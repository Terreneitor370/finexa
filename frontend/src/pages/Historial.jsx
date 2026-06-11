import { useState } from 'react';
import { Link } from 'react-router-dom';

const Historial = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('Octubre');

  const meses = ['Octubre', 'Septiembre', 'Agosto', 'Julio', 'Junio'];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-8 pb-4 border-b border-gray-100">
        <h1 className="text-3xl font-light text-gray-900">Finanzas Intuitivas</h1>
      </div>

      <div className="px-6 py-3 text-xs text-gray-400 border-b border-gray-100">
        Dashboard / Historial
      </div>

      <div className="px-6 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar gasto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full text-gray-900 border-b border-gray-200 py-2 outline-none text-sm"
          />
        </div>

        <div className="flex gap-6 mb-8">
          {meses.map((mes) => (
            <button
              key={mes}
              onClick={() => setMesSeleccionado(mes)}
              className={`text-sm ${
                mesSeleccionado === mes
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-400'
              }`}
            >
              {mes}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-gray-500 text-xs mb-3 tracking-wide">HOY - 24 OCT</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-900 text-sm">Restaurante Al Marea</p>
                    <p className="text-gray-400 text-xs">Comida • 14:30</p>
                  </div>
                  <p className="text-red-600 text-sm">-$45.50</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-900 text-sm">Supermercado Local</p>
                    <p className="text-gray-400 text-xs">Hogar • 09:15</p>
                  </div>
                  <p className="text-red-600 text-sm">-$120.00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 text-xs mb-3 tracking-wide">AYER - 23 OCT</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-900 text-sm">Gasolinera Shell</p>
                    <p className="text-gray-400 text-xs">Transporte • 18:45</p>
                  </div>
                  <p className="text-red-600 text-sm">-$65.00</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-900 text-sm">Transferencia Recibida</p>
                    <p className="text-gray-400 text-xs">Ingresos • 10:00</p>
                  </div>
                  <p className="text-green-600 text-sm">+$850.00</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-500 text-xs mb-3 tracking-wide">22 OCT</h3>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-900 text-sm">Cineplex Ent</p>
                  <p className="text-gray-400 text-xs">Ocio • 21:00</p>
                </div>
                <p className="text-red-600 text-sm">-$24.50</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
        <div className="flex justify-around items-center py-3">
          <Link to="/dashboard" className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Dashboard</span>
          </Link>
          <Link to="/historial" className="flex flex-col items-center">
            <span className="text-gray-900 text-sm font-medium">Historial</span>
          </Link>
          <Link to="/perfil" className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Historial;