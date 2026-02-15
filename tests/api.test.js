// tests/api.test.js
const request = require("supertest");
const { app, resetBooks } = require("../server");

beforeEach(() => {
  resetBooks();
});

describe("Books API", () => {
  test("GET /api/books returns all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);
  });

  test("GET /api/books/:id returns a single book when valid", async () => {
    const res = await request(app).get("/api/books/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 1);
    expect(res.body).toHaveProperty("title");
  });

  test("GET /api/books/:id returns 404 when not found", async () => {
    const res = await request(app).get("/api/books/999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  test("POST /api/books creates a new book", async () => {
    const newBook = { title: "1984", author: "George Orwell", year: 1949, available: true };

    const res = await request(app).post("/api/books").send(newBook);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("1984");

    // confirm it exists now
    const all = await request(app).get("/api/books");
    expect(all.body.length).toBe(4);
  });

  test("POST /api/books returns 400 if missing required fields", async () => {
    const res = await request(app).post("/api/books").send({ author: "No Title" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  test("PUT /api/books/:id updates an existing book", async () => {
    const res = await request(app)
      .put("/api/books/2")
      .send({ available: false, title: "Neuromancer (Updated)" });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(2);
    expect(res.body.available).toBe(false);
    expect(res.body.title).toBe("Neuromancer (Updated)");
  });

  test("PUT /api/books/:id returns 404 if book not found", async () => {
    const res = await request(app).put("/api/books/999").send({ title: "Nope" });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

  test("DELETE /api/books/:id removes a book", async () => {
    const res = await request(app).delete("/api/books/3");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 3);

    const all = await request(app).get("/api/books");
    expect(all.body.length).toBe(2);
  });

  test("DELETE /api/books/:id returns 404 if book not found", async () => {
    const res = await request(app).delete("/api/books/999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
