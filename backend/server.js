// Importation des modules nécessaires
const express = require("express");
const pg = require("pg");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();  // Charger les variables d'environnement depuis le fichier .env

const app = express();
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());  // Utilisation du middleware pour analyser les requêtes JSON

// 🔹 Middleware d'authentification JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Accès refusé, token manquant" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.coachId = decoded.userId; // Associer l'ID du coach à la requête
    next();
  });
};

// Route d'inscription
app.post("/register", async (req, res) => {
  try {
    // Récupération des données envoyées dans le corps de la requête
    const { nom, prenom, email, telephone, equipe, categorie, club, niveau, password } = req.body;

    // Vérifier si l'email existe déjà dans la base de données
    const checkEmail = await pool.query("SELECT * FROM coachs WHERE email = $1", [email]);
    if (checkEmail.rows.length > 0) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    // Hashage du mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertion des données dans la table `coachs`
    const result = await pool.query(
      "INSERT INTO coachs (nom, prenom, email, telephone, equipe, categorie, club, niveau, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [nom, prenom, email, telephone, equipe, categorie, club, niveau, hashedPassword]
    );

    // Création d'un token JWT pour l'utilisateur
    const token = jwt.sign({ userId: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Réponse avec le message et le token
    res.json({ message: "Utilisateur créé avec succès", token });
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et renvoyer un message d'erreur avec les détails
    console.error("Error details:", error);  // Log détaillé de l'erreur
    res.status(500).json({ error: "Erreur lors de l'inscription", details: error.message });
  }
});
// Route de connexion
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'email existe dans la base de données
    const result = await pool.query("SELECT * FROM coachs WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    const user = result.rows[0];

    // Comparer le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Email ou mot de passe incorrect" });
    }

    // Créer un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Répondre avec le token
    res.json({ message: "Connexion réussie", token });
  } catch (error) {
    console.error("Erreur de connexion:", error);
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
});
// Route pour ajouter un joueur
app.post("/addPlayer", authenticateToken, async (req, res) => {
  try {
    // Récupérer les données envoyées dans le corps de la requête
    const{ nom, prenom, dateNaissance, email, telephone, poste, numero, taille, poids, piedFort,  allergies,  antecedentes, contactUrgence, notes, nationalite } = req.body;
    
    // Vérifier si toutes les informations sont présentes
    if (!nom || !prenom || !dateNaissance || !email || !telephone || !poste || !numero || !taille || !poids || !piedFort || !allergies || !antecedentes || !contactUrgence || !notes || !nationalite) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    // Récupérer l'ID du coach à partir du token JWT
    const coachId = req.coachId;

    // Insertion des données du joueur dans la table `joueurs`
    const result = await pool.query(
      "INSERT INTO joueur (nom, prenom, date_naissance, email, telephone, poste, numero, taille, poids, piedFort, allergies, antecedentes, contactUrgence, notes, nationalite, coach_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *",
      [nom, prenom, dateNaissance, email, telephone, poste, numero, taille, poids, piedFort, allergies, antecedentes, contactUrgence, notes, nationalite, coachId]
    );
    

    // Réponse avec le joueur ajouté
    res.json({ message: "Joueur ajouté avec succès", player: result.rows[0] });
  } catch (error) {
    // En cas d'erreur, afficher l'erreur et renvoyer un message d'erreur avec les détails
    console.error("Erreur lors de l'ajout du joueur:", error);
    res.status(500).json({ error: "Erreur lors de l'ajout du joueur", details: error.message });
  }
});




// Démarrer le serveur
app.listen(process.env.PORT, () => console.log(`Serveur sur http://localhost:${process.env.PORT}`));
