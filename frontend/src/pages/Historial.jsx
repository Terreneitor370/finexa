import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const Historial = () => {
  const [gastos, setGastos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState('');
  const [currencySymbol] = useState(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return '$';
    const user = JSON.parse(userData);
    const symbols = { MXN: '$', USD: '$', EUR: '€' };
    return symbols[user.currency] || '$';
  });

  useEffect(() => {
    const loadGastos = async () => {
      try {
        setLoading(true);
        const response = await api.get('/expenses');
        setGastos(response.data || []);
      } catch (error) {
        setServerError(error.response?.data?.message || 'Error al cargar los gastos');
      } finally {
        setLoading(false);
      }
    };

    loadGastos();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      'comida': 'restaurant',
      'transporte': 'directions_car',
      'hogar': 'home',
      'entretenimiento': 'theater_comedy',
      'salud': 'medical_services',
      'ropa': 'checkroom',
      'educacion': 'school',
      'ingreso': 'payments',
      'otro': 'more_horiz'
    };
    return icons[category?.toLowerCase()] || 'payments';
  };

  const gastosFiltrados = gastos.filter(gasto =>
    gasto.description?.toLowerCase().includes(busqueda.toLowerCase()) ||
    gasto.category?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const gastosAgrupados = gastosFiltrados.reduce((grupo, gasto) => {
    const fecha = new Date(gasto.date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
    if (!grupo[fecha]) grupo[fecha] = [];
    grupo[fecha].push(gasto);
    return grupo;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006948]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-32">
      <header className="flex items-center justify-between px-5 h-16 w-full fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#85f8c4] shadow-sm bg-[#85f8c4] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#006948]">person</span>
          </div>
          <h1 className="text-[20px] leading-[28px] font-bold text-[#006948]">Finexa</h1>
        </div>
      </header>

      <Breadcrumbs />

      <main className="pt-36 px-5 pb-8">
        <div className="mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7a72]">search</span>
            <input
              type="text"
              placeholder="Buscar gasto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-4 text-[16px] leading-[24px] text-[#0b1c30] focus:ring-2 focus:ring-[#006948] transition-all outline-none"
            />
          </div>
        </div>

        {serverError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center text-sm">
            {serverError}
          </div>
        )}

        <div className="space-y-6">
          {Object.entries(gastosAgrupados).map(([fecha, gastosDelDia]) => (
            <div key={fecha}>
              <h2 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] mb-3 px-1">{fecha}</h2>
              <div className="space-y-3">
                {gastosDelDia.map((gasto) => {
                  const esIngreso = parseFloat(gasto.amount) > 0;
                  const montoAbs = Math.abs(parseFloat(gasto.amount));
                  return (
                    <div key={gasto.id} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${esIngreso ? 'bg-green-100' : 'bg-[#85f8c4]/30'}`}>
                          <span className={`material-symbols-outlined ${esIngreso ? 'text-green-600' : 'text-[#006948]'}`}>
                            {getCategoryIcon(gasto.category)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-[16px] leading-[24px] font-semibold capitalize">{gasto.description || gasto.category}</h3>
                          <p className="text-[12px] leading-[16px] text-[#6d7a72] capitalize">{gasto.category}</p>
                        </div>
                      </div>
                      <div className={`text-[18px] leading-[24px] tracking-[-0.01em] font-semibold ${esIngreso ? 'text-green-600' : 'text-red-500'}`}>
                        {esIngreso ? '+' : '-'}{currencySymbol}{montoAbs.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {gastosFiltrados.length === 0 && (
            <div className="bg-white p-8 rounded-xl text-center text-gray-400">
              No hay movimientos registrados
            </div>
          )}
        </div>
      </main>

      <Link
        to="/agregar-gasto"
        className="fixed bottom-24 right-6 w-16 h-16 bg-[#006948] text-white rounded-full shadow-[0px_8px_24px_rgba(0,0,0,0.1)] flex items-center justify-center z-50 active:scale-90 transition-transform hover:bg-[#00855d]"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </Link>

      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-lg rounded-t-xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] border-t border-[#bccac0]/20">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#6d7a72] hover:text-[#006948] transition-colors active:scale-90">
          <span className="material-symbols-outlined mb-1">dashboard</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Inicio</span>
        </Link>
        <Link to="/historial" className="flex flex-col items-center justify-center text-[#006948] font-bold transition-transform active:scale-90">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Historial</span>
        </Link>
        <Link to="/perfil" className="flex flex-col items-center justify-center text-[#6d7a72] hover:text-[#006948] transition-colors active:scale-90">
          <span className="material-symbols-outlined mb-1">person</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

export default Historial;