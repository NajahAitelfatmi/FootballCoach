'use client';
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Users, Calendar, Dumbbell, BarChart } from "lucide-react";
import { FaFutbol, FaRunning, FaBandAid } from "react-icons/fa"; // Icônes pour les rôles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faHeartbeat, faMedkit } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { BsFillGearFill, BsCheckCircle, BsFillBookmarkFill, BsToggleOn, BsToggleOff } from 'react-icons/bs';
import Sidebar from '../Sidebar/page'; // Importez le composant Sidebar


export default function Dashboard() {
    const [tasks, setTasks] = useState([
        { title: "Préparer l'entraînement de demain", due: "Aujourd'hui", completed: false, status: "prepare" },
        { title: "Confirmer la disponibilité des joueurs", due: "Aujourd'hui", completed: false, status: "confirm" },
        { title: "Réserver le terrain d'entraînement", due: "Demain", completed: false, status: "reserve" },
      ]);
    
      const toggleTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
      };
  
  const players = [
    { name: "Thomas Dubois", role: "Attaquant - 3 buts en 5 matchs", image: "/images/thomas.jpg", hasScored: true, isInjured: false },
    { name: "Lucas Martin", role: "Milieu - 4 passes décisives", image: "/images/lucas.jpg", hasScored: false, isInjured: false },
    { name: "Karim Benzema", role: "Attaquant - Blessé", image: "/images/benzema.jpg", hasScored: false, isInjured: true }
  ];
  const games = [
    { date: "05/06/2023", match: "FC Marseille vs FC Paris", score: "3-1", result: "Victoire" },
    { date: "28/05/2023", match: "FC Nice vs FC Marseille", score: "2-2", result: "Match nul" },
    { date: "21/05/2023", match: "FC Marseille vs FC Bordeaux", score: "2-0", result: "Victoire" }
  ];
  

  return (
    <div className="flex h-screen bg-white-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-12">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        
        {/* Cards */}
        <div className="grid grid-cols-4 gap-4 my-6">
      {[
        { title: "Effectif", subtitle: "22 joueurs actifs", action: "Voir l'équipe", icon: <Users className="w-6 h-6 text-red-500" /> },
        { title: "Prochain match", subtitle: <>vs FC Lyon - <br /> 15/06/2023</>, action: "Préparer", icon: <Calendar className="w-6 h-6 text-red-500" /> },
        { title: "Entraînement", subtitle: "Aujourd'hui à 18h00", action: "Détails", icon: <Dumbbell className="w-6 h-6 text-red-500" /> }, // Correction ici
        { title: "Statistiques", subtitle: <>3 victoires, 1 nul, 1 <br /> défaite</>, action: "Analyser", icon: <BarChart className="w-6 h-6 text-red-500" /> }
      ].map((card, index) => (
        <div key={index} className="p-4 bg-red-50 rounded shadow-md flex flex-col items-start">
          <div className="mb-2">{card.icon}</div> {/* Affichage de l'icône */}
          <h3 className="font-bold">{card.title}</h3>
          <p className="text-gray-600 text-sm">{card.subtitle}</p>
          <button className="mt-2 bg-red-500 text-white px-3 py-1 rounded">{card.action}</button>
        </div>
      ))}
    </div>
        
        {/* Joueurs à suivre */}
        <section className="my-6">
      <h2 className="font-bold text-lg">Joueurs à suivre</h2>
      <ul className="mt-3">
        {players.map((player, index) => (
          <li key={index} className="flex items-center justify-between p-3 bg-white mt-2 rounded shadow">
            {/* Image + Infos */}
            <div className="flex items-center gap-3">
              <img src={player.image} alt={player.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                {/* Nom du joueur en gras */}
                <span className="block font-bold">{player.name}</span>
                <span className="text-gray-500 text-sm">{player.role}</span>
              </div>
            </div>

            {/* Icônes à droite */}
            <div className="flex items-center gap-3">
              {/* Icône de but */}
              {player.hasScored && <FaFutbol className="text-black-500 w-5 h-5" title="But marqué" />}
              {/* Icône de blessure */}
              {player.isInjured && <FaBandAid className="text-black-500 w-5 h-5" title="Blessé" />}
              {/* Icône de course */}
              {!player.isInjured && !player.hasScored && <FaRunning className="text-black-500 w-5 h-5" title="Actif" />}
            </div>
          </li>
        ))}
      </ul>
    </section>
        
        {/* Derniers résultats */}
        <section className="my-6">
      <h2 className="font-bold text-lg">Derniers résultats</h2>
      <ul className="mt-3">
        {games.map((game, index) => (
          <li key={index} className="flex p-3 bg-white shadow-md mt-2 rounded">
            {/* Icône de football à gauche avec marge à droite */}
            <FaFutbol className="text-gray-700 w-6 h-6 mr-3" />
            
            {/* Informations du match */}
            <span className="w-1/5 font-bold">{game.date}</span>
            <span className="w-1/5">{game.match}</span>
            <span className="w-1/5 text-center">{game.score}</span>
            <span className="w-2/5 text-center text-gray-700">{game.result}</span>
            
            {/* Icône d'œil pour voir plus */}
            <FaRegEye className="text-gray-500 w-5 h-5" />
          </li>
        ))}
      </ul>
    </section>
        {/* Tâches à faire */}
        <section className="my-6">
      <h2 className="font-bold text-lg">Tâches à faire</h2>
      <ul className="mt-3">
        {tasks.map((task, index) => (
          <li key={index} className="flex justify-between p-2 bg-white shadow-md mt-2 rounded">
            <div className="flex items-center">
              {/* Icône dans un fond rouge avec plus de padding */}
              <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                {task.status === "prepare" && (
                  <BsFillGearFill className="text-red-500 w-5 h-5" />
                )}
                {task.status === "confirm" && (
                  <BsCheckCircle className="text-red-500 w-5 h-5" />
                )}
                {task.status === "reserve" && (
                  <BsFillBookmarkFill className="text-red-500 w-5 h-5" />
                )}
              </div>

              {/* Contenu de la tâche */}
              <div>
                {/* Titre de la tâche */}
                <p className="font-bold">{task.title}</p>
                
                {/* Échéance sur une nouvelle ligne */}
                <p className="text-gray-500">Échéance: {task.due}</p>
              </div>
            </div>

            {/* Icône de bascule */}
            <button
              onClick={() => toggleTask(index)}
              className={`w-24 h-8 text-white rounded-full flex items-center justify-center ${
                task.completed ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {task.completed ? "Terminée" : "À faire"}
            </button>
          </li>
        ))}
      </ul>
    </section>
    <div className="h-32"></div> {/* Vous pouvez ajuster la hauteur ici */}

      </main>
    </div>
  );
}