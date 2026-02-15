// server.js
const express = require("express");

const app = express();
app.use(express.json());

// Starter data (you can change titles/authors if you want)
const initialBooks = [
  { id: 1, title: "Dune", author: "Frank Herbert", year: 1965, available: true },
  { id: 2, title: "Neuromancer", author: "William Gibson", year: 1984, available: true },
  { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, available: false },
];

// Put books on app.locals so tests can reset cleanly
function resetBooks() {
  app.locals.books = initialBooks.map((b) => ({ ...b }));
}
resetBooks();

/**
 * GET /api/books - get all books
 */
app.get("/api/books", (req, res) => {
  res.json(app.locals.books);
});

/**
 * GET /api/books/:id - get book by id
 */
app.get("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = app.locals.books.find((b) => b.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

/**
 * POST /api/books - create a new book
 */
app.post("/api/books", (req, res) => {
  const { title, author, year, available } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }

  const books = app.locals.books;
  const newId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;

  const newBook = {
    id: newId,
    title,
    author,
    year: year ?? null,
    available: available ?? true,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

/**
 * PUT /api/books/:id - update an existing book
 */
app.put("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const book = app.locals.books.find((b) => b.id === id);

  if (!book) return res.status(404).json({ error: "Book not found" });

  // Update only fields provided
  const { title, author, year, available } = req.body;
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (year !== undefined) book.year = year;
  if (available !== undefined) book.available = available;

  res.json(book);
});

/**
 * DELETE /api/books/:id - delete a book
 */
app.delete("/api/books/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = app.locals.books.findIndex((b) => b.id === id);

  if (idx === -1) return res.status(404).json({ error: "Book not found" });

  const deleted = app.locals.books.splice(idx, 1)[0];
  res.json(deleted);
});

// Only listen when running `node server.js` or `npm start`
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = { app, resetBooks };
