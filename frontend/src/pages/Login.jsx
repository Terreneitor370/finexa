import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'El correo es obligatorio';
    else if (!validateEmail(email)) newErrors.email = 'Correo electrónico inválido';
    
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    else if (password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es obligatorio';
    else if (name.length < 2) newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    
    if (!email) newErrors.email = 'El correo es obligatorio';
    else if (!validateEmail(email)) newErrors.email = 'Correo electrónico inválido';
    
    if (!password) newErrors.password = 'La contraseña es obligatoria';
    else if (password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    
    setLoading(true);
    setServerError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;
    
    setLoading(true);
    setServerError('');
    
    try {
      const response = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Error al crear cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col justify-center overflow-x-hidden relative">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#006948]/10 blur-[120px]"></div>
        <div className="absolute bottom-[5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-[#4b41e1]/10 blur-[100px]"></div>
      </div>

      <main className="w-full max-w-md mx-auto px-5 py-12 flex flex-col items-center">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-[#00855d] rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-sm">
            <span className="material-symbols-outlined text-white text-4xl">account_balance_wallet</span>
          </div>
          <h1 className="text-[20px] leading-[28px] font-bold text-[#006948] mb-2">Finexa</h1>
          <p className="text-[16px] leading-[24px] text-[#3d4a42] max-w-[280px] mx-auto">
            Toma el control de tu dinero con claridad y seguridad.
          </p>
        </div>

        {serverError && (
          <div className="w-full mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center text-sm">
            {serverError}
          </div>
        )}

        {!isRegister && (
          <form onSubmit={handleLoginSubmit} className="w-full space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1 uppercase">
                  Correo Electrónico
                </label>
                <div className={`relative flex items-center bg-[#F1F5F9] rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#006948] ${errors.email ? 'ring-2 ring-red-500' : ''}`}>
                  <div className="pl-4 flex items-center">
                    <span className="material-symbols-outlined text-[20px] text-[#6d7a72]/60">mail</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className="w-full bg-transparent border-none outline-none px-3 py-4 text-[16px] leading-[24px] text-[#0b1c30] placeholder:text-[#6d7a72]/50"
                    placeholder="tu@ejemplo.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs px-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] uppercase">
                    Contraseña
                  </label>
                  <button type="button" className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#006948] hover:underline">
                    ¿Olvidaste la clave?
                  </button>
                </div>
                <div className={`relative flex items-center bg-[#F1F5F9] rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#006948] ${errors.password ? 'ring-2 ring-red-500' : ''}`}>
                  <div className="pl-4 flex items-center">
                    <span className="material-symbols-outlined text-[20px] text-[#6d7a72]/60">lock</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className="w-full bg-transparent border-none outline-none px-3 py-4 text-[16px] leading-[24px] text-[#0b1c30] placeholder:text-[#6d7a72]/50"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs px-1">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#006948] text-white text-[16px] leading-[24px] rounded-xl font-bold shadow-lg hover:bg-[#00855d] transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
              {!loading && <span className="material-symbols-outlined text-[20px]">chevron_right</span>}
            </button>

            <div className="text-center pt-4">
              <p className="text-[16px] leading-[24px] text-[#3d4a42]">
                ¿No tienes una cuenta?
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setErrors({});
                    setServerError('');
                  }}
                  className="text-[#006948] font-bold hover:underline ml-1"
                >
                  Crear cuenta
                </button>
              </p>
            </div>
          </form>
        )}

        {isRegister && (
          <form onSubmit={handleRegisterSubmit} className="w-full space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1 uppercase">
                  Nombre Completo
                </label>
                <div className={`relative flex items-center bg-[#F1F5F9] rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#006948] ${errors.name ? 'ring-2 ring-red-500' : ''}`}>
                  <div className="pl-4 flex items-center">
                    <span className="material-symbols-outlined text-[20px] text-[#6d7a72]/60">person</span>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    className="w-full bg-transparent border-none outline-none px-3 py-4 text-[16px] leading-[24px] text-[#0b1c30] placeholder:text-[#6d7a72]/50"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs px-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1 uppercase">
                  Correo Electrónico
                </label>
                <div className={`relative flex items-center bg-[#F1F5F9] rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#006948] ${errors.email ? 'ring-2 ring-red-500' : ''}`}>
                  <div className="pl-4 flex items-center">
                    <span className="material-symbols-outlined text-[20px] text-[#6d7a72]/60">mail</span>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className="w-full bg-transparent border-none outline-none px-3 py-4 text-[16px] leading-[24px] text-[#0b1c30] placeholder:text-[#6d7a72]/50"
                    placeholder="tu@ejemplo.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs px-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-[#3d4a42] px-1 uppercase">
                  Contraseña
                </label>
                <div className={`relative flex items-center bg-[#F1F5F9] rounded-xl overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#006948] ${errors.password ? 'ring-2 ring-red-500' : ''}`}>
                  <div className="pl-4 flex items-center">
                    <span className="material-symbols-outlined text-[20px] text-[#6d7a72]/60">lock</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className="w-full bg-transparent border-none outline-none px-3 py-4 text-[16px] leading-[24px] text-[#0b1c30] placeholder:text-[#6d7a72]/50"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs px-1">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#006948] text-white text-[16px] leading-[24px] rounded-xl font-bold shadow-lg hover:bg-[#00855d] transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              {!loading && <span className="material-symbols-outlined text-[20px]">how_to_reg</span>}
            </button>

            <div className="text-center pt-4">
              <p className="text-[16px] leading-[24px] text-[#3d4a42]">
                ¿Ya tienes cuenta?
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setErrors({});
                    setServerError('');
                  }}
                  className="text-[#006948] font-bold hover:underline ml-1"
                >
                  Iniciar Sesión
                </button>
              </p>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Login;