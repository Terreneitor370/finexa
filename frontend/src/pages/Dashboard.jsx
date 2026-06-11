import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 border-b border-gray-100">
        <h1 className="text-3xl font-light text-gray-900">Finanzas Intuitivas</h1>
      </div>

      {/* Breadcrumbs */}
      <div className="px-6 py-3 text-xs text-gray-400 border-b border-gray-100">
        Dashboard
      </div>

      {/* Contenido */}
      <div className="px-6 py-8">
        {/* Balance Total */}
        <div className="mb-10">
          <p className="text-gray-400 text-xs mb-2 tracking-wide">BALANCE TOTAL DEL MES</p>
          <p className="text-5xl font-light text-gray-900">$2,450,000</p>
          <p className="text-green-600 text-sm mt-2 italic">+12% vs mes anterior</p>
        </div>

        {/* Gastos por Categoría */}
        <div className="mb-10">
          <h2 className="text-gray-800 font-medium mb-4">Gastos por Categoría</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Comida</span>
                <span className="text-gray-900">$425</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div className="bg-gray-800 rounded-full h-1" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Transporte</span>
                <span className="text-gray-900">$255</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div className="bg-gray-800 rounded-full h-1" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Ocio</span>
                <span className="text-gray-900">$170</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div className="bg-gray-800 rounded-full h-1" style={{ width: '28%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gastos Recientes */}
        <div>
          <h2 className="text-gray-800 font-medium mb-4">Gastos Recientes</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-900">Almuerzo Ejecutivo</p>
                <p className="text-gray-400 text-xs">Hoy, 13:45</p>
              </div>
              <p className="text-red-600 text-sm">-$25.50</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-900">Viaje a la Oficina</p>
                <p className="text-gray-400 text-xs">Ayer, 08:30</p>
              </div>
              <p className="text-red-600 text-sm">-$12.00</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-900">Suscripción Netflix</p>
                <p className="text-gray-400 text-xs">22 May, 10:15</p>
              </div>
              <p className="text-red-600 text-sm">-$15.99</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante para agregar gasto */}
      <Link
        to="/agregar-gasto"
        className="fixed bottom-20 right-6 bg-black text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800"
      >
        <span className="text-2xl">+</span>
      </Link>

      {/* Navegación inferior - más visible */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-md">
        <div className="flex justify-around items-center py-3">
          <Link to="/dashboard" className="flex flex-col items-center">
            <span className="text-gray-900 text-sm font-medium">Dashboard</span>
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

export default Dashboard;