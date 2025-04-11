'use client';
import React, { useState } from 'react';
import { Home, Users, UserPlus, Calendar, Trophy, BarChart2, Settings, Archive } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // État pour gérer l'ouverture et la fermeture du sidebar
  const [activeSection, setActiveSection] = useState(null); // État pour suivre la section active

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Inverse l'état d'ouverture du sidebar
  };

  const handleSectionClick = (section) => {
    setActiveSection(section); // Définit la section active sur celle qui a été cliquée
  };

  return (
    <div>
      {/* Sidebar : s'affiche ou disparaît selon l'état isOpen */}
      <aside className={`fixed top-0 left-0 h-screen p-6 shadow-lg bg-red-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'}`}>
        {/* Bouton + pour ouvrir/fermer le sidebar */}
        <div className="absolute top-4 right-4 cursor-pointer" onClick={toggleSidebar}>
          <span className="text-xl font-bold">{isOpen ? '-' : '+'}</span>
        </div>

        {/* Contenu du sidebar, affiché seulement si isOpen est true */}
        {isOpen && (
          <>
            <h2 className="text-xl font-semibold mb-6">My Coach Football</h2>
            <nav className="space-y-4 ">
              <a
                href="/Dashboard"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'dashboard' ? 'border-1 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('dashboard')}
              >
                <Home size={20} /> <span>Dashboard</span>
              </a>
              <a
                href="/equipe"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'equipe' ? 'border-1 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('equipe')}
              >
                <Users size={20} /> <span>Équipe</span>
              </a>
              <a
                href="/joueurs"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'joueurs' ? 'border-1 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('joueurs')}
              >
                <UserPlus size={20} /> <span>Joueurs</span>
              </a>
              <a
                href="/entrainnement"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'entrainnement' ? 'border-1 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('entrainnement')}
              >
                <Calendar size={20} /> <span>Entraînements</span>
              </a>
              <a
                href="/matches"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'matches' ? 'border-1 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('matches')}
              >
                <Trophy size={20} /> <span>Matches</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'statistiques' ? 'border-1 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('statistiques')}
              >
                <BarChart2 size={20} /> <span>Statistiques</span>
              </a>
              <hr />
              <a
                href="#"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'parametres' ? 'border-1 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('parametres')}
              >
                <Settings size={20} /> <span>Paramètres</span>
              </a>
              <a
                href="#"
                className={`flex items-center space-x-2 py-2 px-4 rounded ${
                  activeSection === 'archives' ? 'border-4 border-red-500 bg-red-100' : ''
                }`}
                onClick={() => handleSectionClick('archives')}
              >
                <Archive size={20} /> <span>Archives</span>
              </a>
            </nav>
            <div className="absolute bottom-4">
              <p className="text-gray-500">FC Marseille</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
