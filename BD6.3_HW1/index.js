let express = require("express");
let app = express();
app.use(express.json());

let games = [
  {id: 1, title: "The legend of Zelda", genre:"Adventure", developer: "Nitendo"},
  {id: 2, title: "Super Mario Bros", genre: "Platformer", developer: "Nitendo"}
];
let developers = [
  {id: 1, name: "Nitendo", country: "Japan"},
{id: 2, name: "valve", country: "USA"}
];
// function to get all games.
async function getAllGames() {
  return games;
}
// function to get game by id
async function getGameById(id) {
  return games.find((game) => game.id === id);
}
// function to add new game
async function addGame(newGameData) {
  let addedGame = { id: games.length + 1, ...newGameData};
  games.push(addedGame);
  return addedGame;
}
// function to get developer by id.
async function getDeveloperById(id) {
  return developers.find((developer) => developer.id === id);
}
// function to add new developer.
async function addDeveloper(newDeveloperData) {
  let addedDeveloper = { id: developers.length + 1, ...newDeveloperData};
  developers.push(addedDeveloper);
  return addedDeveloper;
}
// Exercise 1: Get All Games
app.get("/games", async (req, res) => {
  let result = await getAllGames();
  res.status(200).json(result);
});
// Exercise 2: Get Game by ID
app.get("/games/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getGameById(id);
  if (! result) {
    return res.status(404).json({ message: "No game found"});
  }
   res.status(200).json(result);
});
// Exercise 3: Add a New Game
app.post("/games/new", async (req, res) => {
  let newGameData = req.body;
  let result = await addGame(newGameData);
  res.status(201).json(result);
});
// Exercise 4: Get Developer by ID
app.get("/developers/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getDeveloperById(id);
  if (! result) {
    return res.status(404).json({ message: "No developer found."});
  }
  res.status(200).json(result);
});
// Exercise 5: Add a New Developer
app.post("/developers/new", async (req, res) => {
  let newDeveloperData = req.body;
  let result = await addDeveloper(newDeveloperData);
  res.status(201).json(result);
})

module.exports = {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper
};