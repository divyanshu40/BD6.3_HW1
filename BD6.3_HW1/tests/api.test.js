let request = require("supertest");
let http = require("http");
let {
  app,
  getAllGames,
  getGameById,
  addGame,
  getDeveloperById,
  addDeveloper
} = require("../index");

jest.mock("../index", () => ({
  ...jest.requireActual("../index"),
  getAllGames: jest.fn(),
  getGameById: jest.fn(),
  addGame: jest.fn(),
  getDeveloperById: jest.fn(),
  addDeveloper: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("API Testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Exercise 6: Test get all games
  it("/games should retrieve all games", async () => {
    let mockGames = [
      {id: 1, title: "The legend of Zelda", genre:"Adventure", developer: "Nitendo"},
  {id: 2, title: "Super Mario Bros", genre: "Platformer", developer: "Nitendo"}
    ];
    getAllGames.mockResolvedValue(mockGames);
    let result = await request(server).get("/games");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGames);
  });
  // Exercise 7: Test get game by ID
  it("/games/details/:id should retrieve game by id", async () => {
    let mockGame = {id: 2, title: "Super Mario Bros", genre: "Platformer", developer: "Nitendo"};
    getGameById.mockResolvedValue(mockGame);
    let result = await request(server).get("/games/details/2");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockGame);
  });
  // Exercise 8: Test get game by non-existent ID
  it("/games/details/:id should return undefined if game not found", async () => {
    getGameById.mockResolvedValue(undefined);
    let result = await request(server).get("/games/details/5");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ message: "No game found"});
  });
  // Exercise 9: Test add new game
  it("/games/new should add new game", async () => {
    let addedGame = { id: 3, title: "Half Life", genre: "FPS", developer: "Valve"};
    addGame.mockResolvedValue(addedGame);
    let result = await request(server).post("/games/new").send({ title: "Half Life", genre: "FPS", developer: "Valve" });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(addedGame);
  });
  // Exercise 10: Test get developer by ID
  it("/developers/details/:id should retrieve developer by id", async () => {
    let mockDeveloper = {id: 1, name: "Nitendo", country: "Japan"};
    getDeveloperById.mockResolvedValue(mockDeveloper);
    let result = await request(server).get("/developers/details/1");
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(mockDeveloper);
  });
  // Exercise 11: Test get developer by non-existent ID
  it("/developers/details/:id should return undefined if developer not found", async () => {
    getDeveloperById.mockResolvedValue(undefined);
    let result = await request(server).get("/developers/details/7");
    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual({ message: "No developer found."});
  });
  // Exercise 12: Test add new developer
  it("/developers/new should add and return new developer", async () => {
    let addedDeveloper = { id: 3, name: "Epic Games", country: "USA"};
    addDeveloper.mockResolvedValue(addedDeveloper);
    let result = await request(server).post("/developers/new").send({  name: "Epic Games", country: "USA" });
    expect(result.statusCode).toEqual(201);
    expect(result.body).toEqual(addedDeveloper);
  });
});