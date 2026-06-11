import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AgregarGasto = () => {
  const navigate = useNavigate();
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [nota, setNota] = useState('');

  const categorias = ['Comida', 'Transporte', 'Hogar', 'Ocio', 'Salud', 'Otros'];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="px-6 pt-8 pb-4 border-b border-gray-100">
        <h1 className="text-3xl font-light text-gray-900">Agregar Gasto</h1>
      </div>

      <div className="px-6 py-3 text-xs text-gray-400 border-b border-gray-100">
        Dashboard / Agregar Gasto
      </div>

      <div className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-gray-400 text-xs mb-2 tracking-wide">
              MONTO DEL GASTO
            </label>
            <div className="text-4xl font-light text-gray-900">
              $ <span className="outline-none">0.00</span>
            </div>
          </div>

          <div>
            <h2 className="text-gray-800 font-medium mb-3">Categoría</h2>
            <p className="text-gray-400 text-xs mb-3">Selecciona una</p>
            <div className="space-y-2">
              {categorias.map((cat) => (
                <label key={cat} className="flex items-center">
                  <input
                    type="radio"
                    name="categoria"
                    value={cat}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-gray-700 text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-800 text-sm mb-2">
              Fecha del Gasto
            </label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full text-gray-900 border-b border-gray-200 py-2 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm mb-2">
              Nota (Opcional)
            </label>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className="w-full text-gray-900 border-b border-gray-200 py-2 outline-none resize-none"
              rows="2"
              placeholder="Ej: Cena con amigos..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium mt-8"
          >
            Guardar Gasto
          </button>
        </form>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
        <div className="flex justify-around items-center py-3">
          <Link to="/dashboard" className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Dashboard</span>
          </Link>
          <Link to="/historial" className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Historial</span>
          </Link>
          <Link to="/perfil" className="flex flex-col items-center">
            <span className="text-gray-400 text-sm">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AgregarGasto;