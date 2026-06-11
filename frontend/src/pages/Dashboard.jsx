import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [totalGastado, setTotalGastado] = useState(0);
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [categoriasGastos, setCategoriasGastos] = useState([]);
  const [movimientosRecientes, setMovimientosRecientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currencySymbol] = useState(() => {
    const userData = localStorage.getItem('user');
    if (!userData) return '$';
    const user = JSON.parse(userData);
    const symbols = { MXN: '$', USD: '$', EUR: '€' };
    return symbols[user.currency] || '$';
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [summaryRes, expensesRes] = await Promise.all([
          api.get('/expenses/summary'),
          api.get('/expenses')
        ]);

        const { totalGastado, totalIngresos, balance, categories } = summaryRes.data;
        setTotalGastado(totalGastado);
        setTotalIngresos(totalIngresos);
        setBalance(balance);
        setCategoriasGastos(categories || []);

        const movimientos = expensesRes.data || [];
        const recientes = movimientos
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setMovimientosRecientes(recientes);

      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      'comida': 'restaurant',
      'transporte': 'directions_car',
      'entretenimiento': 'theater_comedy',
      'salud': 'medical_services',
      'ropa': 'checkroom',
      'educacion': 'school',
      'ingreso': 'payments',
      'otro': 'more_horiz'
    };
    return icons[category?.toLowerCase()] || 'payments';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006948] mx-auto"></div>
          <p className="mt-4 text-[#3d4a42]">Cargando...</p>
        </div>
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

      <main className="pt-36 px-5 space-y-6">

        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-xl text-center text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl shadow-md text-white ${balance >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
            <p className="text-xs font-semibold opacity-80">BALANCE TOTAL</p>
            <p className="text-2xl font-bold">
              {balance < 0 ? '-' : ''}{currencySymbol}{Math.abs(balance).toLocaleString()}
            </p>
          </div>
          <div className="bg-red-500 p-4 rounded-xl shadow-md text-white">
            <p className="text-xs font-semibold opacity-80">TOTAL GASTADO</p>
            <p className="text-2xl font-bold">{currencySymbol}{totalGastado.toLocaleString()}</p>
          </div>
        </div>

        {totalIngresos > 0 && (
          <div className="bg-green-500 p-4 rounded-xl shadow-md text-white">
            <p className="text-xs font-semibold opacity-80">TOTAL INGRESOS</p>
            <p className="text-2xl font-bold">+{currencySymbol}{totalIngresos.toLocaleString()}</p>
          </div>
        )}

        {categoriasGastos.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Gastos por Categoría</h2>
            <div className="space-y-3">
              {categoriasGastos.map((cat, idx) => {
                const total = categoriasGastos.reduce((sum, c) => sum + parseFloat(c.total), 1);
                const porcentaje = (parseFloat(cat.total) / total) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-gray-500">{cat.category}</span>
                      <span className="font-semibold">{currencySymbol}{parseFloat(cat.total).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-600 rounded-full h-2" style={{ width: `${porcentaje}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-700">Movimientos Recientes</h2>
            <Link to="/historial" className="text-green-600 text-xs font-semibold">VER TODO</Link>
          </div>
          <div className="space-y-2">
            {movimientosRecientes.length === 0 && (
              <div className="bg-white p-8 rounded-xl text-center text-gray-400">
                No hay movimientos registrados
              </div>
            )}
            {movimientosRecientes.map((mov) => {
              const esIngreso = parseFloat(mov.amount) > 0;
              const montoAbs = Math.abs(parseFloat(mov.amount));
              return (
                <div key={mov.id} className="bg-white p-3 rounded-xl shadow-sm flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${esIngreso ? 'bg-green-100' : 'bg-red-100'}`}>
                      <span className={`material-symbols-outlined text-xl ${esIngreso ? 'text-green-600' : 'text-red-500'}`}>
                        {getCategoryIcon(mov.category)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold capitalize">{mov.description || mov.category}</p>
                      <p className="text-xs text-gray-400">{new Date(mov.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${esIngreso ? 'text-green-600' : 'text-red-500'}`}>
                    {esIngreso ? '+' : '-'}{currencySymbol}{montoAbs.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Link to="/agregar-gasto" className="fixed bottom-24 right-6 w-14 h-14 bg-[#006948] text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-[#00855d] active:scale-95 transition-all">
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md rounded-t-xl shadow-lg border-t border-gray-100 py-2">
        <div className="flex justify-around items-center">
          <Link to="/dashboard" className="flex flex-col items-center text-[#006948] font-bold">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-xs mt-1">Inicio</span>
          </Link>
          <Link to="/historial" className="flex flex-col items-center text-gray-400 hover:text-[#006948]">
            <span className="material-symbols-outlined">history</span>
            <span className="text-xs mt-1">Historial</span>
          </Link>
          <Link to="/perfil" className="flex flex-col items-center text-gray-400 hover:text-[#006948]">
            <span className="material-symbols-outlined">person</span>
            <span className="text-xs mt-1">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;