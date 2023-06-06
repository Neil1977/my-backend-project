const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./routes/starwars.db');

// Get all entries
const getAllEntries = (req, res) => {
  const query = 'SELECT * FROM entries';
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(200).json(rows);
    }
  });
};

// Get a single entry by ID
const getEntryById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM entries WHERE id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!row) {
      res.status(404).json({ error: 'Entry not found' });
    } else {
      res.status(200).json(row);
    }
  });
};

// Add a new entry
const addEntry = (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO entries (title, content) VALUES (?, ?)';
  db.run(query, [title, content], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
};

// Update an entry
const updateEntry = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = 'UPDATE entries SET title = ?, content = ? WHERE id = ?';
  db.run(query, [title, content, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Entry not found' });
    } else {
      res.status(200).json({ message: 'Entry updated successfully' });
    }
  });
};

// Delete an entry
const deleteEntry = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM entries WHERE id = ?';
  db.run(query, [id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Entry not found' });
    } else {
      res.status(200).json({ message: 'Entry deleted successfully' });
    }
  });
};

module.exports = {
  getAllEntries,
  getEntryById,
  addEntry,
  updateEntry,
  deleteEntry,
};
