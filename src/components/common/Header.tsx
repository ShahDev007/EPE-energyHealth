import { Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Infrastructure Monitor
        </h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;