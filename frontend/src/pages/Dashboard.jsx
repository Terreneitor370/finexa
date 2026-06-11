import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [gastosRecientes, setGastosRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [summaryRes, expensesRes] = await Promise.all([
        api.get('/expenses/summary'),
        api.get('/expenses?limit=3')
      ]);
      
      setBalance(summaryRes.data.total || 0);
      setCategorias(summaryRes.data.categories || []);
      setGastosRecientes(expensesRes.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Comida': 'restaurant',
      'Transporte': 'directions_car',
      'Hogar': 'home',
      'Ocio': 'theater_comedy',
      'Salud': 'medical_services',
      'Otros': 'more_horiz'
    };
    return icons[category] || 'payments';
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
          <h1 className="text-[20px] leading-[28px] font-bold text-[#006948]">Finanzas Intuitivas</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#006948] hover:bg-[#eff4ff] transition-colors active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <Breadcrumbs />

      <main className="pt-36 px-5 space-y-6">
        <section className="bg-[#00855d] p-6 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold opacity-90 mb-1">BALANCE TOTAL DEL MES</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[40px] leading-[48px] tracking-[-0.02em] font-bold">$</span>
              <span className="text-[40px] leading-[48px] tracking-[-0.02em] font-bold">{balance.toLocaleString()}</span>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="text-[20px] leading-[28px] font-semibold text-[#3d4a42] mb-6">Gastos por Categoría</h2>
          <div className="space-y-4">
            {categorias.length > 0 ? (
              categorias.map((cat, idx) => {
                const total = categorias.reduce((sum, c) => sum + (c.total || 0), 1);
                const percentage = ((cat.total || 0) / total) * 100;
                return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#6d7a72]">{cat._id}</span>
                      <span className="text-[#0b1c30] font-semibold">${(cat.total || 0).toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-[#006948] rounded-full h-2" style={{ width: `${percentage}%` }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400 py-4">No hay gastos registrados</p>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] leading-[28px] font-semibold text-[#3d4a42]">Gastos Recientes</h2>
            <Link to="/historial" className="text-[#006948] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">
              VER TODO
            </Link>
          </div>
          <div className="space-y-3">
            {gastosRecientes.length > 0 ? (
              gastosRecientes.map((gasto) => (
                <div key={gasto._id} className="bg-white p-4 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#85f8c4]/30 text-[#006948] flex items-center justify-center">
                    <span className="material-symbols-outlined">{getCategoryIcon(gasto.category)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] leading-[24px] font-semibold">{gasto.description || gasto.category}</h3>
                    <p className="text-[12px] text-[#6d7a72]">{new Date(gasto.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">
                    -${gasto.amount.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl text-center text-gray-400">
                No hay gastos recientes
              </div>
            )}
          </div>
        </section>
      </main>

      <Link
        to="/agregar-gasto"
        className="fixed bottom-24 right-6 w-16 h-16 bg-[#006948] text-white rounded-full shadow-[0px_8px_24px_rgba(0,0,0,0.1)] flex items-center justify-center z-50 active:scale-90 transition-transform hover:bg-[#00855d]"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </Link>

      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-lg rounded-t-xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] border-t border-[#bccac0]/20">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#006948] font-bold transition-transform active:scale-90">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Inicio</span>
        </Link>
        <Link to="/historial" className="flex flex-col items-center justify-center text-[#6d7a72] hover:text-[#006948] transition-colors active:scale-90">
          <span className="material-symbols-outlined mb-1">history</span>
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

export default Dashboard;