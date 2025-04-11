'use client';
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { Calendar, Trophy, Users } from "lucide-react";
import Sidebar from '../Sidebar/page';

export default function Matches() {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newMatch, setNewMatch] = useState({
    date: "",
    match: "",
    location: "",
    competition: "",
  });

  const [upcomingMatches, setUpcomingMatches] = useState([
    { date: "20/06/2023", match: "FC Marseille vs FC Lyon", location: "Stade Vélodrome", competition: "Ligue 1" },
    { date: "27/06/2023", match: "FC Paris vs FC Marseille", location: "Parc des Princes", competition: "Ligue 1" }
  ]);

  const [pastMatches, setPastMatches] = useState([
    { date: "05/06/2023", match: "FC Marseille vs FC Paris", score: "3-1", result: "Victoire", competition: "Ligue 1", stats: { FCMarseille: { goals: 3, shots: 15, possession: 55, passes: 320, keyPlayers: ["Player1", "Player2"] }, FCParis: { goals: 1, shots: 8, possession: 45, passes: 290, keyPlayers: ["Player3", "Player4"] } } },
    { date: "28/05/2023", match: "FC Nice vs FC Marseille", score: "2-2", result: "Match nul", competition: "Coupe de France", stats: { FCMarseille: { goals: 2, shots: 10, possession: 50, passes: 280, keyPlayers: ["Player5", "Player6"] }, FCNice: { goals: 2, shots: 12, possession: 50, passes: 270, keyPlayers: ["Player7", "Player8"] } } },
    { date: "21/05/2023", match: "FC Marseille vs FC Bordeaux", score: "2-0", result: "Victoire", competition: "Ligue 1", stats: { FCMarseille: { goals: 2, shots: 13, possession: 60, passes: 310, keyPlayers: ["Player9", "Player10"] }, FCBordeaux: { goals: 0, shots: 5, possession: 40, passes: 250, keyPlayers: ["Player11", "Player12"] } } }
  ]);

  // Liste des joueurs disponibles
  const players = ["Joueur1", "Joueur2", "Joueur3", "Joueur4"];
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMatch({ ...newMatch, [name]: value });
  };

  const handleAddMatch = () => {
    setUpcomingMatches([...upcomingMatches, newMatch]);
    setShowForm(false);
    setNewMatch({ date: "", match: "", location: "", competition: "" });
  };

  const handleMatchClick = (match) => {
    if (pastMatches.some(m => m.match === match.match)) {
      setSelectedMatch(match);
    } else {
      setSelectedMatch({ ...match, upcoming: true });
    }
  };

  const closeModal = () => {
    setSelectedMatch(null);
  };

  const handleConvocation = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
    alert(`Email envoyé à ${player}`);
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
        <h1 className="text-2xl font-bold">Matchs</h1>

        {/* Add Match Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-6"
        >
          Ajouter un match
        </button>

        {/* Form to add a new match */}
        {showForm && (
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-4">Ajouter un nouveau match</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="match"
                value={newMatch.match}
                onChange={handleInputChange}
                placeholder="Match (ex: FC Marseille vs FC Lyon)"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="location"
                value={newMatch.location}
                onChange={handleInputChange}
                placeholder="Lieu (ex: Stade Vélodrome)"
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="date"
                value={newMatch.date}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <select
                name="competition"
                value={newMatch.competition}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="">Sélectionner la compétition</option>
                <option value="Ligue 1">Ligue 1</option>
                <option value="Champions League">Champions League</option>
                <option value="Coupe de France">Coupe de France</option>
                <option value="Europa League">Europa League</option>
              </select>
              <button
                onClick={handleAddMatch}
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Ajouter le match
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Display Upcoming Matches */}
        <h2 className="text-xl font-semibold mb-4">Matchs à venir</h2>
        <div className="space-y-4">
          {upcomingMatches.map((match, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleMatchClick(match)}
            >
              <h3 className="text-lg font-bold">{match.match}</h3>
              <p>{match.date} - {match.location}</p>
              <p>{match.competition}</p>
            </div>
          ))}
        </div>

        {/* Display Past Matches */}
        <h2 className="text-xl font-semibold mb-4 mt-8">Matchs passés</h2>
        <div className="space-y-4">
          {pastMatches.map((match, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleMatchClick(match)}
            >
              <h3 className="text-lg font-bold">{match.match}</h3>
              <p>{match.date} - {match.result}</p>
              <p>Score: {match.score}</p>
              <p>{match.competition}</p>
            </div>
          ))}
        </div>

        {/* Match Modal */}
        {selectedMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2">
              <h2 className="font-bold text-xl mb-4">{selectedMatch.match}</h2>

              {/* Affichage des statistiques pour les matchs passés */}
              {selectedMatch.stats && (
                <div>
                  <h3 className="font-semibold mt-4">Statistiques</h3>
                  <div className="flex justify-between mt-2">
                    <div className="w-1/2">
                      <h4 className="font-bold">FC Marseille</h4>
                      <p>Buts: {selectedMatch.stats.FCMarseille.goals}</p>
                      <p>Tirs: {selectedMatch.stats.FCMarseille.shots}</p>
                      <p>Possession: {selectedMatch.stats.FCMarseille.possession}%</p>
                      <p>Passes: {selectedMatch.stats.FCMarseille.passes}</p>
                      <p>Joueurs clés: {selectedMatch.stats.FCMarseille.keyPlayers.join(", ")}</p>
                    </div>
                    <div className="w-1/2">
                      <h4 className="font-bold">FC Paris</h4>
                      <p>Buts: {selectedMatch.stats.FCParis.goals}</p>
                      <p>Tirs: {selectedMatch.stats.FCParis.shots}</p>
                      <p>Possession: {selectedMatch.stats.FCParis.possession}%</p>
                      <p>Passes: {selectedMatch.stats.FCParis.passes}</p>
                      <p>Joueurs clés: {selectedMatch.stats.FCParis.keyPlayers.join(", ")}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Afficher la convocation si le match est à venir */}
              {selectedMatch.upcoming && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Liste des joueurs</h3>
                  <ul>
                    {players.map(player => (
                      <li key={player} className="flex justify-between items-center">
                        <span>{player}</span>
                        <button
                          className="bg-green-500 text-white py-1 px-3 rounded"
                          onClick={() => handleConvocation(player)}
                        >
                          Convoquer
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
