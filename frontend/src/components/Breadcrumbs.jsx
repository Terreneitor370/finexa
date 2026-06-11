import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNames = {
    dashboard: 'Dashboard',
    historial: 'Historial',
    'agregar-gasto': 'Agregar Gasto',
    perfil: 'Perfil',
  };

  // Si es la página principal (dashboard), mostrar solo "Dashboard"
  if (pathnames.length === 0 || (pathnames.length === 1 && pathnames[0] === 'dashboard')) {
    return (
      <div className="px-5 py-3 text-sm bg-white/80 border-b border-[#bccac0]/20 sticky top-16 z-40">
        <span className="text-[#0b1c30] font-medium">Dashboard</span>
      </div>
    );
  }

  return (
    <div className="px-5 py-3 text-sm bg-white/80 border-b border-[#bccac0]/20 sticky top-16 z-40">
      <Link to="/dashboard" className="text-[#006948] hover:underline font-medium">
        Dashboard
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNames[name] || name;

        return (
          <span key={name}>
            <span className="mx-1 text-[#6d7a72]">/</span>
            {isLast ? (
              <span className="text-[#0b1c30] font-medium">{displayName}</span>
            ) : (
              <Link to={routeTo} className="text-[#006948] hover:underline font-medium">
                {displayName}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;