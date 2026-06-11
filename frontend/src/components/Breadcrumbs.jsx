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

  if (pathnames.length === 0 || pathnames[0] === '') {
    return null;
  }

  return (
    <div className="px-6 py-3 text-xs text-gray-400 border-b border-gray-100">
      <Link to="/dashboard" className="hover:text-gray-600">
        Dashboard
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const displayName = routeNames[name] || name;

        return (
          <span key={name}>
            <span className="mx-1">/</span>
            {isLast ? (
              <span className="text-gray-600">{displayName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-gray-600">
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