import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Historial = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mesSeleccionado, setMesSeleccionado] = useState('Octubre');
  const meses = ['Octubre', 'Septiembre', 'Agosto', 'Julio', 'Junio'];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-32">
      {/* TopAppBar - Fixed */}
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

      {/* Breadcrumbs - Sticky debajo del header */}
      <Breadcrumbs />

      {/* Main content */}
      <main className="pt-36 px-5 pb-8">
        {/* Search */}
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

        {/* Month Filter */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6">
          {meses.map((mes) => (
            <button
              key={mes}
              onClick={() => setMesSeleccionado(mes)}
              className={`px-6 py-2 rounded-full text-[12px] leading-[16px] tracking-[0.05em] font-semibold whitespace-nowrap ${
                mesSeleccionado === mes
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'bg-[#dce9ff] text-[#3d4a42] hover:bg-[#dce9ff]/80'
              }`}
            >
              {mes}
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-6">
          {/* HOY */}
          <div>
            <h2 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] mb-3 px-1">HOY - 24 OCT</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#85f8c4]/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006948]">restaurant</span>
                  </div>
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold">Restaurante Al Marea</h3>
                    <p className="text-[12px] leading-[16px] text-[#6d7a72]">Comida • 14:30</p>
                  </div>
                </div>
                <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">-$45.50</div>
              </div>

              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#85f8c4]/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006948]">shopping_bag</span>
                  </div>
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold">Supermercado Local</h3>
                    <p className="text-[12px] leading-[16px] text-[#6d7a72]">Hogar • 09:15</p>
                  </div>
                </div>
                <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">-$120.00</div>
              </div>
            </div>
          </div>

          {/* AYER */}
          <div>
            <h2 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] mb-3 px-1">AYER - 23 OCT</h2>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#e2dfff]/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#4b41e1]">directions_car</span>
                  </div>
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold">Gasolinera Shell</h3>
                    <p className="text-[12px] leading-[16px] text-[#6d7a72]">Transporte • 18:45</p>
                  </div>
                </div>
                <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">-$65.00</div>
              </div>

              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-[#85f8c4]/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#006948]">payments</span>
                  </div>
                  <div>
                    <h3 className="text-[16px] leading-[24px] font-semibold">Transferencia Recibida</h3>
                    <p className="text-[12px] leading-[16px] text-[#6d7a72]">Ingresos • 10:00</p>
                  </div>
                </div>
                <div className="text-[#006948] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">+$850.00</div>
              </div>
            </div>
          </div>

          {/* 22 OCT */}
          <div>
            <h2 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] mb-3 px-1">22 OCT</h2>
            <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-[#ffdad7]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#9b3e3b]">movie</span>
                </div>
                <div>
                  <h3 className="text-[16px] leading-[24px] font-semibold">Cineplex Ent</h3>
                  <p className="text-[12px] leading-[16px] text-[#6d7a72]">Ocio • 21:00</p>
                </div>
              </div>
              <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">-$24.50</div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB Button */}
      <Link
        to="/agregar-gasto"
        className="fixed bottom-24 right-6 w-16 h-16 bg-[#006948] text-white rounded-full shadow-[0px_8px_24px_rgba(0,0,0,0.1)] flex items-center justify-center z-50 active:scale-90 transition-transform hover:bg-[#00855d]"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-lg rounded-t-xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] border-t border-[#bccac0]/20">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#6d7a72] hover:text-[#006948] transition-colors active:scale-90">
          <span className="material-symbols-outlined mb-1">dashboard</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Dashboard</span>
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