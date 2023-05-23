// Import the necessary modules
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Get the path to the database file
const dbPath = path.join(__dirname, "starwars.db");

// Create a new SQLite database
const db = new sqlite3.Database(dbPath);

// Create the tables for characters, films, and planets
db.serialize(() => {
  // Create the characters table
  db.run(`CREATE TABLE characters (
    id INTEGER PRIMARY KEY,
    name TEXT,
    height TEXT,
    gender TEXT
  )`);

  // Insert the character data
  const characterData = [
    [1, "Luke Skywalker", "172", "male"],
    [2, "Leia Organa", "150", "female"],
    [3, "Han Solo", "180", "male"],
    [4, "Darth Vader", "202", "male"],
    [5, "Yoda", "66", "male"],
    [6, "Obi-Wan Kenobi", "182", "male"],
    [7, "Padmé Amidala", "165", "female"],
    [8, "Anakin Skywalker", "188", "male"],
    [9, "Chewbacca", "228", "male"],
    [10, "Rey", "170", "female"],
  ];

  // Prepare the SQL statement for inserting character data
  const characterStmt = db.prepare(
    "INSERT INTO characters (id, name, height, gender) VALUES (?, ?, ?, ?)"
  );

  // Iterate over each character data and execute the prepared statement
  characterData.forEach((data) => characterStmt.run(data));

  // Finalize the prepared statement
  characterStmt.finalize();

  // Create the films table
  db.run(`CREATE TABLE films (
    id INTEGER PRIMARY KEY,
    title TEXT,
    director TEXT,
    releaseYear INTEGER
  )`);

  // Insert the film data
  const filmData = [
    [1, "A New Hope", "George Lucas", 1977],
    [2, "The Empire Strikes Back", "Irvin Kershner", 1980],
    [3, "Return of the Jedi", "Richard Marquand", 1983],
    [4, "The Phantom Menace", "George Lucas", 1999],
    [5, "Attack of the Clones", "George Lucas", 2002],
    [6, "Revenge of the Sith", "George Lucas", 2005],
    [7, "The Force Awakens", "J.J. Abrams", 2015],
    [8, "The Last Jedi", "Rian Johnson", 2017],
    [9, "The Rise of Skywalker", "J.J. Abrams", 2019],
    [10, "Rogue One: A Star Wars Story", "Gareth Edwards", 2016],
  ];

  // Prepare the SQL statement for inserting film data
  const filmStmt = db.prepare(
    "INSERT INTO films (id, title, director, releaseYear) VALUES (?, ?, ?, ?)"
  );

  // Iterate over each film data and execute the prepared statement
  filmData.forEach((data) => filmStmt.run(data));

  // Finalize the prepared statement
  filmStmt.finalize();

  // Create the planets table
  db.run(`CREATE TABLE planets (
    id INTEGER PRIMARY KEY,
    name TEXT,
    climate TEXT,
    terrain TEXT
  )`);

  // Insert the planet data
  const planetData = [
    [1, "Tatooine", "Arid", "Desert"],
    [2, "Hoth", "Frozen", "Tundra"],
    [3, "Endor", "Temperate", "Forest"],
    [4, "Naboo", "Temperate", "Grasslands"],
    [5, "Coruscant", "Temperate", "Urban"],
    [6, "Kashyyyk", "Tropical", "Forest"],
    [7, "Jakku", "Arid", "Desert"],
    [8, "Alderaan", "Temperate", "Grasslands"],
    [9, "Mustafar", "Hot", "Volcanic"],
    [10, "Yavin IV", "Temperate", "Jungle"],
  ];

  // Prepare the SQL statement for inserting planet data
  const planetStmt = db.prepare(
    "INSERT INTO planets (id, name, climate, terrain) VALUES (?, ?, ?, ?)"
  );

  // Iterate over each planet data and execute the prepared statement
  planetData.forEach((data) => planetStmt.run(data));

  // Finalize the prepared statement
  planetStmt.finalize();

  // Print a message indicating that the database was created successfully
  console.log("Database created successfully!");
});

// Close the database connection
db.close();
