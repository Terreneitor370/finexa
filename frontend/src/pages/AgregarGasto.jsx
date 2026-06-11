import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const AgregarGasto = () => {
  const navigate = useNavigate();
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('Comida');
  const [fecha, setFecha] = useState('');
  const [nota, setNota] = useState('');

  const categorias = [
    { nombre: 'Comida', icono: 'restaurant' },
    { nombre: 'Transporte', icono: 'directions_car' },
    { nombre: 'Hogar', icono: 'home' },
    { nombre: 'Ocio', icono: 'theater_comedy' },
    { nombre: 'Salud', icono: 'medical_services' },
    { nombre: 'Otros', icono: 'more_horiz' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-32">
      {/* Top Navigation - Fixed */}
      <header className="flex items-center justify-between px-5 h-16 w-full fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eff4ff] transition-colors active:scale-95">
          <span className="material-symbols-outlined text-[#0b1c30]">arrow_back</span>
        </button>
        <h1 className="text-[20px] leading-[28px] font-bold text-[#006948]">Agregar Gasto</h1>
        <div className="w-10"></div>
      </header>

      {/* Breadcrumbs - Sticky debajo del header */}
      <Breadcrumbs />

      {/* Main content - con padding-top para header + breadcrumbs */}
      <main className="pt-36 px-5 max-w-md mx-auto pb-8">
        {/* Amount Input */}
        <section className="mt-6 flex flex-col items-center">
          <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] uppercase mb-2">Monto del Gasto</label>
          <div className="w-full flex items-center justify-center bg-white rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border border-[#bccac0]/10">
            <span className="text-[40px] leading-[48px] tracking-[-0.02em] font-bold text-[#00855d] mr-2">$</span>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-[40px] leading-[48px] tracking-[-0.02em] font-bold text-[#0b1c30] placeholder:text-[#cbdbf5] text-center outline-none"
              placeholder="0.00"
              required
            />
          </div>
        </section>

        {/* Category Grid */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] leading-[28px] font-bold">Categoría</h2>
            <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42]">Selecciona una</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categorias.map((cat) => (
              <button
                key={cat.nombre}
                type="button"
                onClick={() => setCategoria(cat.nombre)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all active:scale-95 ${
                  categoria === cat.nombre
                    ? 'bg-[#006948] text-white'
                    : 'bg-[#dce9ff] text-[#0b1c30]'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm ${
                  categoria === cat.nombre ? 'bg-white/20' : 'bg-white'
                }`}>
                  <span className={`material-symbols-outlined ${
                    categoria === cat.nombre ? 'text-white' : 'text-[#006948]'
                  }`}>{cat.icono}</span>
                </div>
                <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold">{cat.nombre}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Form Details */}
        <section className="mt-6 space-y-4">
          <div>
            <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] block mb-2">Fecha del Gasto</label>
            <div className="flex items-center bg-[#F1F5F9] rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#006948] transition-all">
              <span className="material-symbols-outlined text-[#6d7a72] mr-3">calendar_today</span>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] block mb-2">Nota (Opcional)</label>
            <div className="flex items-start bg-[#F1F5F9] rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#006948] transition-all">
              <span className="material-symbols-outlined text-[#6d7a72] mr-3 mt-0.5">notes</span>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] resize-none outline-none"
                placeholder="Ej: Cena con amigos..."
                rows="2"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Save Button - Fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-5 bg-white/80 backdrop-blur-lg border-t border-[#bccac0]/20 z-50">
        <button
          onClick={handleSubmit}
          className="w-full bg-[#006948] text-white h-14 rounded-full font-bold text-lg flex items-center justify-center shadow-[0px_8px_24px_rgba(0,105,72,0.3)] active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          Guardar Gasto
        </button>
      </div>
    </div>
  );
};

export default AgregarGasto;