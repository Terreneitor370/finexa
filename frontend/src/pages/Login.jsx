import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-5xl font-light text-gray-900 mb-3">Finexa</h1>
        <p className="text-gray-500 text-sm mb-10">
          Toma el control de tu dinero con claridad y seguridad.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2 tracking-wide">
              CORREO ELECTRÓNICO
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 outline-none text-gray-900"
              placeholder="tu@ejemplo.com"
              required
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <label className="text-gray-800 text-xs font-semibold tracking-wide">
                CONTRASEÑA
              </label>
              <a href="#" className="text-xs text-gray-400">
                ¿Olvidaste la clave?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm hover:bg-gray-800"
          >
            Iniciar Sesión
          </button>

          <p className="text-center text-gray-500 text-xs mt-6">
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className="text-black font-medium">
              Crear cuenta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;