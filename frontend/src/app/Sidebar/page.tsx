// components/Sidebar.js
import React from 'react';
import { Home, Users, UserPlus, Calendar, Trophy, BarChart2, Settings, Archive } from 'lucide-react';

const Sidebar = ({  }) => {
  return (
    <div>
    <aside className="w-64 p-6 shadow-lg bg-red-50 fixed top-0 left-0 h-screen">
    <h2 className="text-xl font-semibold mb-6">My Coach Football</h2>
        <nav className="space-y-4 ">
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded ">
            <Home size={20} /> <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded">
            <Users size={20} /> <span>Équipe</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded ">
            <UserPlus size={20} /> <span>Joueurs</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded">
            <Calendar size={20} /> <span>Entraînements</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded">
            <Trophy size={20} /> <span>Matches</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded">
            <BarChart2 size={20} /> <span>Statistiques</span>
          </a>
          <hr />
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded">
            <Settings size={20} /> <span>Paramètres</span>
          </a>
          <a href="#" className="flex items-center space-x-2 py-2 px-4 rounded">
            <Archive size={20} /> <span>Archives</span>
          </a>
        </nav>
        <div className="absolute bottom-4">
          <p className="text-gray-500">FC Marseille</p>
        </div>
      </aside>
      </div>
  );
};

export default Sidebar;
