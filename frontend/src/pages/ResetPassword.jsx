import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 8) {
      newErrors.password = 'Mínimo 8 caracteres';
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Debe tener al menos una mayúscula';
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Debe tener al menos un número';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      await api.post('/auth/reset-password', { token, password });
      setSuccess('Contraseña actualizada correctamente');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setServerError(error.response?.data?.message || 'Error al restablecer contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-md flex flex-col gap-6">

        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-[#006948] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-white text-3xl">lock_reset</span>
          </div>
          <h1 className="text-[24px] font-bold text-[#006948]">Nueva contraseña</h1>
          <p className="text-[14px] text-[#6d7a72] text-center">
            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
          </p>
        </div>

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

        {!token && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-center text-sm">
            Token inválido. Solicita un nuevo enlace de recuperación.
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#3d4a42] px-1 tracking-wide">
              NUEVA CONTRASEÑA
            </label>
            <div className={`bg-[#F1F5F9] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#006948] transition-all ${errors.password ? 'ring-2 ring-red-500' : ''}`}>
              <span className="material-symbols-outlined text-[#6d7a72]">lock</span>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] text-[#0b1c30] outline-none"
                placeholder="Mínimo 8 caracteres"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs px-1">{errors.password}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-[#3d4a42] px-1 tracking-wide">
              CONFIRMAR CONTRASEÑA
            </label>
            <div className={`bg-[#F1F5F9] rounded-xl px-4 py-3.5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#006948] transition-all ${errors.confirmPassword ? 'ring-2 ring-red-500' : ''}`}>
              <span className="material-symbols-outlined text-[#6d7a72]">lock</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                }}
                className="bg-transparent border-none focus:ring-0 w-full text-[16px] text-[#0b1c30] outline-none"
                placeholder="Repite tu contraseña"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs px-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !token}
          className="bg-[#006948] text-white h-14 rounded-xl font-bold active:scale-[0.98] transition-transform shadow-[0px_4px_12px_rgba(0,105,72,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Actualizando...' : 'Actualizar contraseña'}
        </button>

        <button
          onClick={() => navigate('/')}
          className="text-[#006948] text-sm font-semibold text-center"
        >
          Volver al inicio de sesión
        </button>

      </div>
    </div>
  );
};

export default ResetPassword;