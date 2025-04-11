'use client';
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaRegEye, FaYoutube } from "react-icons/fa";
import { Calendar, Trophy, Users, Clock, Activity, Video } from "lucide-react";
import Sidebar from '../../src/app/Sidebar/page';

export default function Entrainement() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newSession, setNewSession] = useState({
    date: "",
    time: "",
    duration: "",
    type: "",
    objectives: "",
    location: ""
  });

  const [upcomingSessions, setUpcomingSessions] = useState([
    { date: "22/06/2023", time: "10:00", duration: "90", type: "Tactique", objectives: "Travail défensif", location: "Terrain principal" },
    { date: "24/06/2023", time: "15:30", duration: "120", type: "Physique", objectives: "Endurance", location: "Salle de gym" }
  ]);

  const [pastSessions, setPastSessions] = useState([
    { 
      date: "20/06/2023", 
      time: "09:00", 
      duration: "90", 
      type: "Technique", 
      objectives: "Contrôle de balle", 
      location: "Terrain annexe",
      attendance: 18,
      stats: {
        intensity: 85,
        exercises: ["Passe en mouvement", "Tirs cadrés", "Petits jeux"],
        notes: "Bon engagement des joueurs, progression visible sur les contrôles"
      }
    },
    { 
      date: "18/06/2023", 
      time: "16:00", 
      duration: "105", 
      type: "Tactique", 
      objectives: "Transition défense-attaque", 
      location: "Terrain principal",
      attendance: 20,
      stats: {
        intensity: 78,
        exercises: ["Exercice 8vs8", "Travail sur les ailiers", "Corners"],
        notes: "Besoin de travailler la synchronisation entre milieux et attaquants"
      }
    }
  ]);

  // New state for tactical exercises
  const [showExercises, setShowExercises] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Tactical exercises data with YouTube embed IDs
  const tacticalExercises = [
    {
      id: 1,
      title: "Exercice de transition défense-attaque",
      description: "Travail sur la rapidité de transition après récupération du ballon",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      duration: "8:32",
      difficulty: "Moyen",
      category: "Transition"
    },
    {
      id: 2,
      title: "Jeu de position 4vs4+3",
      description: "Amélioration de la circulation du ballon en supériorité numérique",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      duration: "12:15",
      difficulty: "Difficile",
      category: "Conservation"
    },
    {
      id: 3,
      title: "Travail sur les appels croisés",
      description: "Déséquilibre défensif par mouvements coordonnés des attaquants",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      duration: "6:45",
      difficulty: "Facile",
      category: "Attaque"
    },
    {
      id: 4,
      title: "Bloc défensif compact",
      description: "Organisation défensive en bloc bas et transitions rapides",
      videoId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
      duration: "10:20",
      difficulty: "Moyen",
      category: "Défense"
    }
  ];

  const players = ["Joueur1", "Joueur2", "Joueur3", "Joueur4"];
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSession({ ...newSession, [name]: value });
  };

  const handleAddSession = () => {
    setUpcomingSessions([...upcomingSessions, newSession]);
    setShowForm(false);
    setNewSession({ date: "", time: "", duration: "", type: "", objectives: "", location: "" });
  };

  const handleSessionClick = (session) => {
    if (pastSessions.some(s => s.date === session.date && s.time === session.time)) {
      setSelectedSession(session);
    } else {
      setSelectedSession({ ...session, upcoming: true });
    }
  };

  const closeModal = () => {
    setSelectedSession(null);
  };

  const handlePresence = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
    alert(`${player} marqué présent`);
  };

  // New handler for exercise selection
  const handleExerciseSelect = (exercise) => {
    setSelectedExercise(exercise);
  };

  const ProgressBar = ({ value, label }) => (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <div className="w-full bg-gray-200 rounded-full h-2 ml-4">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );

  return (
    <div className="flex h-screen bg-white-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <h1 className="text-2xl font-bold">Entrainements</h1>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Planifier un entrainement
          </button>
          <button
            onClick={() => setShowExercises(!showExercises)}
            className="bg-green-600 text-white py-2 px-4 rounded-md flex items-center"
          >
            <Video className="mr-2 h-4 w-4" />
            {showExercises ? 'Masquer les exercices' : 'Voir les exercices tactiques'}
          </button>
        </div>

        {/* Tactical Exercises Section */}
        {showExercises && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaYoutube className="mr-2 text-red-600" />
              Exercices tactiques
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tacticalExercises.map((exercise) => (
                <div 
                  key={exercise.id} 
                  className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleExerciseSelect(exercise)}
                >
                  <div className="relative">
                    {/* YouTube thumbnail placeholder */}
                    <div className="bg-gray-200 h-40 flex items-center justify-center">
                      <FaYoutube className="text-red-600 text-5xl" />
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                      {exercise.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{exercise.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{exercise.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {exercise.category}
                      </span>
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercise Video Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
              <h2 className="font-bold text-xl mb-4 flex items-center">
                <FaYoutube className="mr-2 text-red-600" />
                {selectedExercise.title}
              </h2>
              
              {/* YouTube Video Embed */}
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  className="w-full h-96"
                  src={`https://www.youtube.com/embed/${selectedExercise.videoId}`}
                  title={selectedExercise.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold">Catégorie</p>
                  <p>{selectedExercise.category}</p>
                </div>
                <div>
                  <p className="font-semibold">Difficulté</p>
                  <p>{selectedExercise.difficulty}</p>
                </div>
                <div>
                  <p className="font-semibold">Durée</p>
                  <p>{selectedExercise.duration}</p>
                </div>
              </div>
              
              <p className="mb-4">{selectedExercise.description}</p>
              
              <button
                onClick={() => {
                  // Add to training plan logic would go here
                  setSelectedExercise(null);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
              >
                Ajouter à mon plan d'entraînement
              </button>
              
              <button
                onClick={() => setSelectedExercise(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Display Upcoming Sessions */}
        <h2 className="text-xl font-semibold mb-4">Entrainements à venir</h2>
        <div className="space-y-4">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleSessionClick(session)}
            >
              <div className="flex items-center">
                <Activity className="mr-2 text-blue-500" />
                <div>
                  <h3 className="text-lg font-bold">{session.type}</h3>
                  <p className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {session.date} à {session.time} - {session.duration} min
                  </p>
                  <p>{session.objectives}</p>
                  <p className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {session.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Display Past Sessions */}
        <h2 className="text-xl font-semibold mb-4 mt-8">Entrainements passés</h2>
        <div className="space-y-4">
          {pastSessions.map((session, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleSessionClick(session)}
            >
              <div className="flex items-center">
                <Activity className="mr-2 text-green-500" />
                <div>
                  <h3 className="text-lg font-bold">{session.type}</h3>
                  <p className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {session.date} à {session.time} - {session.duration} min
                  </p>
                  <p>{session.objectives}</p>
                  <p className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {session.attendance}/20 joueurs présents
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Session Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
              <h2 className="font-bold text-xl mb-4">
                <Activity className="inline mr-2" />
                {selectedSession.type}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold">Date</p>
                  <p>{selectedSession.date}</p>
                </div>
                <div>
                  <p className="font-semibold">Heure</p>
                  <p>{selectedSession.time}</p>
                </div>
                <div>
                  <p className="font-semibold">Durée</p>
                  <p>{selectedSession.duration} minutes</p>
                </div>
                <div>
                  <p className="font-semibold">Lieu</p>
                  <p>{selectedSession.location}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Objectifs</p>
                <p>{selectedSession.objectives}</p>
              </div>

              {selectedSession.stats && (
                <div>
                  <h3 className="font-semibold mt-4">Bilan de la séance</h3>
                  <div className="mt-2 space-y-2">
                    <ProgressBar value={selectedSession.stats.intensity} label="Intensité" />
                    <div>
                      <p className="font-semibold">Exercices réalisés:</p>
                      <ul className="list-disc pl-5">
                        {selectedSession.stats.exercises.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold">Notes:</p>
                      <p>{selectedSession.stats.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedSession.upcoming && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Liste des joueurs</h3>
                  <ul>
                    {players.map(player => (
                      <li key={player} className="flex justify-between items-center">
                        <span>{player}</span>
                        <button
                          className="bg-green-500 text-white py-1 px-3 rounded"
                          onClick={() => handlePresence(player)}
                        >
                          Présent
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}