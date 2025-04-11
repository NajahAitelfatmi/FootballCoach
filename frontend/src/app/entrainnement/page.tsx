'use client';

import { useState } from 'react';
import { FaGlobe, FaEnvelope, FaSearch, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import Sidebar from '../Sidebar/page';
import { useRouter } from "next/navigation";

export default function AjouterJoueur() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [exercises, setExercises] = useState([
    {
      id: 1,
      title: 'Échauffement',
      duration: '15 minutes',
      description: 'Course légère, étirements dynamiques et exercices de coordination',
    },
    {
      id: 2,
      title: 'Passes courtes',
      duration: '20 minutes',
      description: 'Travail en passes en triangle avec déplacement et contrôle orienté',
    },
    {
      id: 3,
      title: 'Opposition réduite',
      duration: '25 minutes',
      description: 'Jeu à 3 contre 5 sur terrain réduit avec objectif de conservation',
    },
  ]);

  const players = [
    {
      id: 1,
      name: 'Lionel Messi',
      position: 'Attaquant',
      number: '10',
      image: '/images/messi.jpg',
    },
    {
      id: 2,
      name: 'Cristiano Ronaldo',
      position: 'Attaquant',
      number: '7',
      image: '/images/ronaldo.jpg',
    },
    {
      id: 3,
      name: 'Kylian Mbappé',
      position: 'Attaquant',
      number: '7',
      image: '/images/mbappe.jpg',
    },
    // Ajoutez plus de joueurs ici
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedPlayers([]);
    } else {
      setSelectedPlayers(players.map(player => player.id));
    }
    setSelectAll(!selectAll);
  };

  const handlePlayerSelection = (playerId) => {
    setSelectedPlayers(prevSelected => {
      if (prevSelected.includes(playerId)) {
        return prevSelected.filter(id => id !== playerId);
      } else {
        return [...prevSelected, playerId];
      }
    });
  };

  const router = useRouter();

  const handleRedirect = () => {
    router.push('/exercice');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white flex justify-center">
        <div className="max-w-lg">
          <h1 className="text-2xl font-semibold mt-4 mb-2 text-left ml-5">
            Planifier une séance d'entraînement
          </h1>
          <form className="p-6 rounded-lg space-y-6">
            {/* Informations générales */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Informations générales</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4">
                  <label className="block w-1/2">
                    <span className="block mb-2">Date</span>
                    <input type="date" className="w-full px-3 py-2 rounded-lg bg-gray-100" />
                  </label>
                  <label className="block w-1/2">
                    <span className="block mb-2">Heure</span>
                    <input type="time" className="w-full px-3 py-2 rounded-lg bg-gray-100" placeholder="HH:MM" />
                  </label>
                </div>
                <div className="flex gap-4">
                  <label className="block w-1/2">
                    <span className="block mb-2">Durée (minutes)</span>
                    <input type="number" className="w-full px-3 py-2 rounded-lg bg-gray-100" placeholder='Ex: 90' />
                  </label>
                  <label className="block w-1/2 relative">
                    <span className="block mb-2">Lieu</span>
                    <div className="relative">
                      <input className="w-full pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400" placeholder="Nom du terrain" />
                      <FaMapMarkerAlt size={15} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
                    </div>
                  </label>
                </div>
                <label className="block relative">
                  <span className="block mb-2">Thème de la séance</span>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pr-12 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400"
                      placeholder="Ex: Travail défensif, Jeu de transition..."
                    />
                    <FaClipboardList size={15} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
                  </div>
                </label>
              </div>
            </div>

            {/* Sélectionner les joueurs */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Participantes</h2>
              <label className="block relative">
                <div className="relative mb-4">
                  <span className="block mb-2">Sélectionner les joueurs</span>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full pr-10 pl-4 py-2 rounded-lg bg-gray-100 h-12 text-gray-600 placeholder-gray-400"
                      placeholder="Rechercher un joueur..."
                    />
                    <FaSearch size={15} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="form-checkbox h-5 w-5 text-white border-black bg-white rounded peer"
                />
                <span>Tous les joueurs</span>
              </label>
              <hr className="my-4 border-gray-300" />

              <div className="mt-4">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center mb-4 border-b pb-4">
                    <input
                      type="checkbox"
                      checked={selectedPlayers.includes(player.id)}
                      onChange={() => handlePlayerSelection(player.id)}
                      className="mr-4 form-checkbox h-5 w-5 border-black bg-white text-white peer"
                    />
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="flex w-full mb-2">
                      <div className="flex-1 text-left">
                        <span className="font-semibold">{player.name}</span>
                      </div>
                      <div className="flex-1 text-center">
                        <span className="text-black">{player.position}</span>
                      </div>
                      <div className="flex-1 text-right">
                        <span className="text-black">#{player.number}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exercices */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Exercices</h2>
              <button
                type="button"
                onClick={handleRedirect}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
              >
                Ajouter un exercice
              </button>
              <div className="space-y-4">
                {exercises.map((exercise) => (
                  <div key={exercise.id} className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Exercice {exercise.id}: {exercise.title}</h3>
                    <p className="text-sm mb-2 text-gray-500">Durée: {exercise.duration}</p>
                    <p>{exercise.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Notes */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Notes et objectifs</h2>
              <label className="block">
                <span className="block mb-2">Objectifs de la séance</span>
                <textarea
                  className="w-full px-3 py-2 rounded-lg bg-gray-100 min-h-40 resize-y"
                  placeholder="Objectifs techniques, tactiques, physiques..."
                />
              </label>
            </div>

            {/* Boutons */}
            <div className="flex space-x-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                Enregistrer
              </button>
              <button type="reset" className="bg-gray-100 text-blue-600 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition">
                Annuler
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
