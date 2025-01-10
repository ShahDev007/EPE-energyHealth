import { Link } from 'react-router-dom';
import { LayoutDashboard, Battery, BarChart } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Assets', icon: <Battery size={20} />, path: '/assets' },
    { name: 'Analytics', icon: <BarChart size={20} />, path: '/analytics' }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">EPE Infrastructure</h1>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;