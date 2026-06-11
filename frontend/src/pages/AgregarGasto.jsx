import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const AgregarGasto = () => {
  const navigate = useNavigate();
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('comida');
  const [tipo, setTipo] = useState('gasto');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const categoriasGasto = [
    { nombre: 'comida', icono: 'restaurant' },
    { nombre: 'transporte', icono: 'directions_car' },
    { nombre: 'entretenimiento', icono: 'theater_comedy' },
    { nombre: 'salud', icono: 'medical_services' },
    { nombre: 'ropa', icono: 'checkroom' },
    { nombre: 'educacion', icono: 'school' },
    { nombre: 'otro', icono: 'more_horiz' },
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!monto) {
      newErrors.monto = 'El monto es obligatorio';
    } else if (isNaN(monto) || Number(monto) <= 0) {
      newErrors.monto = 'El monto debe ser un número mayor a 0';
    }
    
    if (tipo === 'gasto' && !categoria) {
      newErrors.categoria = 'Selecciona una categoría';
    }
    
    if (!fecha) {
      newErrors.fecha = 'La fecha es obligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setServerError('');
    
    try {
      const montoNumerico = parseFloat(monto);
      
      // FORZAR: Ingreso = POSITIVO, Gasto = NEGATIVO
      let amount;
      if (tipo === 'ingreso') {
        amount = Math.abs(montoNumerico);  // ✅ Fuerza positivo
      } else {
        amount = -Math.abs(montoNumerico); // ✅ Fuerza negativo
      }
      
      const category = tipo === 'ingreso' ? 'ingreso' : categoria;
            
      const response = await api.post('/expenses', {
        amount: amount,
        category: category,
        date: fecha,
        description: descripcion || undefined
      });
            
      // Verificar que se guardó correctamente
      if (response.data && response.data.amount) {
        console.log('Monto guardado en BD:', response.data.amount);
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.log('Error completo:', error);
      console.log('Response error:', error.response?.data);
      setServerError(error.response?.data?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-32">
      <header className="flex items-center justify-between px-5 h-16 w-full fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eff4ff] transition-colors active:scale-95">
          <span className="material-symbols-outlined text-[#0b1c30]">arrow_back</span>
        </button>
        <h1 className="text-[20px] leading-[28px] font-bold text-[#006948]">Agregar</h1>
        <div className="w-10"></div>
      </header>

      <Breadcrumbs />

      <main className="pt-36 px-5 max-w-md mx-auto pb-8">
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center text-sm">
            {serverError}
          </div>
        )}

        {/* Selector de tipo */}
        <section className="mt-6">
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={() => {
                setTipo('gasto');
                setCategoria('comida');
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                tipo === 'gasto'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
               Gasto
            </button>
            <button
              type="button"
              onClick={() => {
                setTipo('ingreso');
              }}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                tipo === 'ingreso'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
               Ingreso
            </button>
          </div>
        </section>

        {/* Monto */}
        <section className="mt-6 flex flex-col items-center">
          <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] uppercase mb-2">
            {tipo === 'ingreso' ? 'MONTO DEL INGRESO' : 'MONTO DEL GASTO'}
          </label>
          <div className={`w-full flex items-center justify-center bg-white rounded-xl p-6 shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border ${errors.monto ? 'border-red-500' : 'border-[#bccac0]/10'}`}>
            <span className={`text-[40px] leading-[48px] tracking-[-0.02em] font-bold mr-2 ${tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'}`}>
              {tipo === 'ingreso' ? '+' : '-'}
            </span>
            <input
              type="number"
              value={monto}
              onChange={(e) => {
                setMonto(e.target.value);
                if (errors.monto) setErrors({ ...errors, monto: '' });
              }}
              className="w-full bg-transparent border-none focus:ring-0 text-[40px] leading-[48px] tracking-[-0.02em] font-bold text-[#0b1c30] placeholder:text-[#cbdbf5] text-center outline-none"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
          {errors.monto && <p className="text-red-500 text-xs mt-1">{errors.monto}</p>}
        </section>

        {/* Categorías - Solo para gastos */}
        {tipo === 'gasto' && (
          <section className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] leading-[28px] font-bold">Categoría</h2>
              <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42]">Selecciona una</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categoriasGasto.map((cat) => (
                <button
                  key={cat.nombre}
                  type="button"
                  onClick={() => setCategoria(cat.nombre)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all active:scale-95 ${
                    categoria === cat.nombre
                      ? 'bg-red-500 text-white'
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
                  <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold capitalize">{cat.nombre}</span>
                </button>
              ))}
            </div>
            {errors.categoria && <p className="text-red-500 text-xs mt-2">{errors.categoria}</p>}
          </section>
        )}

        {/* Fecha */}
        <section className="mt-6">
          <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] block mb-2">Fecha</label>
          <div className="flex items-center bg-[#F1F5F9] rounded-xl px-4 py-4 focus-within:ring-2 focus-within:ring-[#006948] transition-all">
            <span className="material-symbols-outlined text-[#6d7a72] mr-3">calendar_today</span>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] outline-none"
            />
          </div>
        </section>

      </main>

      {/* Botón Guardar */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-5 bg-white/80 backdrop-blur-lg border-t border-[#bccac0]/20 z-50">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full h-14 rounded-full font-bold text-lg flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed ${
            tipo === 'ingreso' 
              ? 'bg-green-600 text-white' 
              : 'bg-red-500 text-white'
          }`}
        >
          <span className="material-symbols-outlined mr-2">{tipo === 'ingreso' ? 'add' : 'remove'}</span>
          {loading ? 'Guardando...' : tipo === 'ingreso' ? 'Agregar Ingreso' : 'Agregar Gasto'}
        </button>
      </div>
    </div>
  );
};

export default AgregarGasto;