import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
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
          Crea tu cuenta y comienza a controlar tus finanzas.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2 tracking-wide">
              NOMBRE COMPLETO
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-800 text-xs font-semibold mb-2 tracking-wide">
              CORREO ELECTRÓNICO
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 outline-none"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-gray-800 text-xs font-semibold mb-2 tracking-wide">
              CONTRASEÑA
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 outline-none"
              required
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-black text-white px-8 py-2 rounded-md text-sm hover:bg-gray-800"
            >
              Crear Cuenta
            </button>
          </div>

          <p className="text-center text-gray-500 text-xs mt-8">
            ¿Ya tienes cuenta?{' '}
            <Link to="/" className="text-black font-medium">
              Iniciar Sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;