import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-32">
      {/* TopAppBar */}
      <header className="flex items-center justify-between px-5 h-16 w-full fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#85f8c4] shadow-sm bg-[#85f8c4] flex items-center justify-center">
            <span className="material-symbols-outlined text-[#006948]">person</span>
          </div>
          <h1 className="text-[20px] leading-[28px] font-bold text-[#006948]">Finexa</h1>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#006948] hover:bg-[#eff4ff] transition-colors active:scale-95">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      {/* Breadcrumbs */}
      <Breadcrumbs />

      <main className="pt-36 px-5 space-y-6">
        {/* Total Balance */}
        <section className="bg-[#00855d] p-6 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold opacity-90 mb-1">BALANCE TOTAL DEL MES</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[40px] leading-[48px] tracking-[-0.02em] font-bold">$</span>
              <span className="text-[40px] leading-[48px] tracking-[-0.02em] font-bold">2,450,000</span>
            </div>
            <div className="mt-4 flex items-center gap-2 bg-white/10 w-fit px-3 py-1 rounded-full">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold">+12% vs mes anterior</span>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </section>

        {/* Gastos por Categoría */}
        <section className="bg-white p-6 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="text-[20px] leading-[28px] font-semibold text-[#3d4a42] mb-6">Gastos por Categoría</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#6d7a72]">Comida</span>
                <span className="text-[#0b1c30] font-semibold">$425</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#006948] rounded-full h-2" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#6d7a72]">Transporte</span>
                <span className="text-[#0b1c30] font-semibold">$255</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#4b41e1] rounded-full h-2" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-[#6d7a72]">Ocio</span>
                <span className="text-[#0b1c30] font-semibold">$170</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-[#ba5551] rounded-full h-2" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Gastos Recientes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] leading-[28px] font-semibold text-[#3d4a42]">Gastos Recientes</h2>
            <button className="text-[#006948] text-[12px] leading-[16px] tracking-[0.05em] font-semibold">VER TODO</button>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#85f8c4]/30 text-[#006948] flex items-center justify-center">
                <span className="material-symbols-outlined">restaurant</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] leading-[24px] font-semibold">Almuerzo Ejecutivo</h3>
                <p className="text-[12px] text-[#6d7a72]">Hoy, 13:45</p>
              </div>
              <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">-$25.50</div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e2dfff]/30 text-[#4b41e1] flex items-center justify-center">
                <span className="material-symbols-outlined">local_taxi</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] leading-[24px] font-semibold">Viaje a la Oficina</h3>
                <p className="text-[12px] text-[#6d7a72]">Ayer, 08:30</p>
              </div>
              <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">-$12.00</div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#ffdad7]/30 text-[#9b3e3b] flex items-center justify-center">
                <span className="material-symbols-outlined">movie</span>
              </div>
              <div className="flex-1">
                <h3 className="text-[16px] leading-[24px] font-semibold">Suscripción Netflix</h3>
                <p className="text-[12px] text-[#6d7a72]">22 May, 10:15</p>
              </div>
              <div className="text-[#ba1a1a] text-[18px] leading-[24px] tracking-[-0.01em] font-semibold">-$15.90</div>
            </div>
          </div>
        </section>
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