import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Breadcrumbs from '../components/Breadcrumbs';

const Perfil = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [moneda, setMoneda] = useState('EUR');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    cargarDatosUsuario();
  }, []);

  const cargarDatosUsuario = () => {
    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined') {
      try {
        const user = JSON.parse(userData);
        setNombre(user.name || '');
        setEmail(user.email || '');
        setTelefono(user.phone || '');
        setMoneda(user.currency || 'EUR');
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
    } else if (nombre.length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (nombre.length > 100) {
      newErrors.nombre = 'El nombre no puede exceder 100 caracteres';
    }
    
    if (telefono) {
      const telefonoLimpio = telefono.replace(/[\s\+\-\(\)]/g, '');
      if (telefonoLimpio.length < 8) {
        newErrors.telefono = 'El teléfono debe tener al menos 8 dígitos';
      } else if (telefonoLimpio.length > 15) {
        newErrors.telefono = 'El teléfono no puede exceder 15 dígitos';
      } else if (!/^\d+$/.test(telefonoLimpio)) {
        newErrors.telefono = 'El teléfono solo debe contener números';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setServerError('');
    setSuccess('');
    
    try {
      const telefonoLimpio = telefono ? telefono.replace(/[\s\+\-\(\)]/g, '') : '';
      const response = await api.put('/auth/profile', { 
        name: nombre, 
        phone: telefonoLimpio, 
        currency: moneda 
      });
      
      const userActualizado = {
        ...JSON.parse(localStorage.getItem('user') || '{}'),
        name: nombre,
        phone: telefonoLimpio,
        currency: moneda
      };
      localStorage.setItem('user', JSON.stringify(userActualizado));
      
      setSuccess('Cambios guardados correctamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.log('Error completo:', error.response?.data);
      setServerError(error.response?.data?.message || 'Error al guardar cambios');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] pb-32">
      <header className="bg-white/80 backdrop-blur-md text-[#006948] text-[20px] leading-[28px] font-bold flex items-center justify-between px-5 h-16 w-full fixed top-0 left-0 right-0 z-50">
        <button onClick={() => navigate(-1)} className="material-symbols-outlined active:scale-95 transition-transform text-[#3d4a42]">
          arrow_back
        </button>
        <span>Perfil</span>
        {/* Botón de settings ELIMINADO */}
      </header>

      <Breadcrumbs />

      <main className="pt-36 px-5 flex flex-col gap-6 pb-8">
        <section className="flex flex-col items-center justify-center gap-2 py-4">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-4 border-white bg-[#dce9ff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#006948] text-6xl">person</span>
            </div>
            {/* Botón de editar foto ELIMINADO */}
          </div>
          <div className="text-center mt-2">
            <h2 className="text-[20px] leading-[28px] font-bold text-[#0b1c30]">{nombre}</h2>
            <p className="text-[14px] text-[#6d7a72]">{email}</p>
          </div>
        </section>

        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl text-center text-sm">
            {success}
          </div>
        )}

        {serverError && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-center text-sm">
            {serverError}
          </div>
        )}

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1">NOMBRE COMPLETO</label>
            <div className={`bg-[#F1F5F9] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#006948] transition-all ${errors.nombre ? 'ring-2 ring-red-500' : ''}`}>
              <span className="material-symbols-outlined text-[#6d7a72]">person</span>
              <input
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  if (errors.nombre) setErrors({ ...errors, nombre: '' });
                }}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] outline-none"
                maxLength="100"
              />
            </div>
            {errors.nombre && <p className="text-red-500 text-xs px-1">{errors.nombre}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1">TELÉFONO</label>
            <div className={`bg-[#F1F5F9] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#006948] transition-all ${errors.telefono ? 'ring-2 ring-red-500' : ''}`}>
              <span className="material-symbols-outlined text-[#6d7a72]">call</span>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                  if (errors.telefono) setErrors({ ...errors, telefono: '' });
                }}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] leading-[24px] text-[#0b1c30] outline-none"
                placeholder="+00 000 000 000"
              />
            </div>
            {errors.telefono && <p className="text-red-500 text-xs px-1">{errors.telefono}</p>}
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

        <section className="flex flex-col gap-4 mt-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#006948] text-white h-14 rounded-xl font-bold active:scale-[0.98] transition-transform shadow-[0px_4px_12px_rgba(0,105,72,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
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

      <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-lg rounded-t-xl shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] border-t border-[#bccac0]/20">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-[#6d7a72] hover:text-[#006948] transition-colors active:scale-90">
          <span className="material-symbols-outlined mb-1">dashboard</span>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold mt-1">Inicio</span>
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