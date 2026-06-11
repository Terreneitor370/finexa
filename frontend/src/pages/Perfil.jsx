import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Perfil = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('Alejandro García');
  const [telefono, setTelefono] = useState('+34 600 000 000');
  const [moneda, setMoneda] = useState('EUR');

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-32">
      {/* Top App Bar - Fixed */}
      <header className="bg-white/80 backdrop-blur-md text-[#006948] text-[20px] leading-[28px] font-bold flex items-center justify-between px-5 h-16 w-full fixed top-0 left-0 right-0 z-50">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined active:scale-95 transition-transform text-[#3d4a42]">
          arrow_back
        </button>
        <span>Perfil</span>
        <button className="material-symbols-outlined active:scale-95 transition-transform text-[#3d4a42]">
          settings
        </button>
      </header>

      {/* Breadcrumbs - Sticky debajo del header */}
      <Breadcrumbs />

      {/* Main content */}
      <main className="pt-36 px-5 flex flex-col gap-6 pb-8">
        {/* Profile Picture */}
        <section className="flex flex-col items-center justify-center gap-2 py-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-4 border-white bg-[#dce9ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#006948] text-6xl">person</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-[#006948] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <div className="text-center mt-2">
            <h2 className="text-[20px] leading-[28px] font-bold text-[#0b1c30]">{nombre}</h2>
          </div>
        </section>

        {/* Form Fields */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1">NOMBRE COMPLETO</label>
            <div className="bg-[#F1F5F9] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#006948] transition-all">
              <span className="material-symbols-outlined text-[#6d7a72]">person</span>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1">TELÉFONO</label>
            <div className="bg-[#F1F5F9] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#006948] transition-all">
              <span className="material-symbols-outlined text-[#6d7a72]">call</span>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1">TIPO DE MONEDA</label>
            <div className="bg-[#F1F5F9] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#006948] transition-all relative">
              <span className="material-symbols-outlined text-[#6d7a72]">payments</span>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] outline-none appearance-none pr-8"
              >
                <option value="EUR">EUR (€) - Euro</option>
                <option value="USD">USD ($) - Dólar</option>
                <option value="MXN">MXN ($) - Peso Mexicano</option>
              </select>
              <span className="material-symbols-outlined text-[#6d7a72] absolute right-4 pointer-events-none">expand_more</span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col gap-4 mt-4">
          <button className="bg-[#006948] text-white h-14 rounded-xl font-bold active:scale-[0.98] transition-transform shadow-[0px_4px_12px_rgba(0,105,72,0.2)]">
            Guardar Cambios
          </button>
          <button
            onClick={handleLogout}
            className="bg-[#eff4ff] text-[#ba1a1a] h-14 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform hover:bg-[#ffdad6]/20 border border-[#ba1a1a]/10"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-lg rounded-t-xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] border-t border-[#bccac0]/20">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#6d7a72] hover:text-[#006948] transition-colors active:scale-90">
          <span className="material-symbols-outlined mb-1">dashboard</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Dashboard</span>
        </Link>
        <Link to="/historial" className="flex flex-col items-center justify-center text-[#6d7a72] hover:text-[#006948] transition-colors active:scale-90">
          <span className="material-symbols-outlined mb-1">history</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Historial</span>
        </Link>
        <Link to="/perfil" className="flex flex-col items-center justify-center text-[#006948] font-bold transition-transform active:scale-90">
          <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

export default Perfil;