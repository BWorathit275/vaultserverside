const request = require("supertest");
const createApp = require("./app");

let app;
beforeEach(() => {
  app = createApp(); // fresh data for every test, so tests don't affect each other
});

describe("GET /api/books", () => {
  it("should return 200 and all books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toEqual({ id: 1, title: "Clean Code", price: 890 });
  });
});

describe("GET /api/books/:id", () => {
  it("should return one book", async () => {
    const res = await request(app).get("/api/books/2");
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Refactoring");
  });
  it("should return 404 for a missing book", async () => {
    const res = await request(app).get("/api/books/999");
    expect(res.status).toBe(404);
  });
});

describe("POST /api/books", () => {
  it("should create a book and return 201", async () => {
    const res = await request(app).post("/api/books").send({ title: " Node.js ", price: 650 });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 3, title: "Node.js", price: 650 });

    const list = await request(app).get("/api/books");
    expect(list.body).toHaveLength(3);
  });
  it("should return 400 when the title is missing", async () => {
    const res = await request(app).post("/api/books").send({ price: 100 });
    expect(res.status).toBe(400);
  });
  it("should return 400 for a price given as a string", async () => {
    const res = await request(app).post("/api/books").send({ title: "X", price: "100" });
    expect(res.status).toBe(400);
  });
  it("should return 400 for price 0 (boundary)", async () => {
    const res = await request(app).post("/api/books").send({ title: "X", price: 0 });
    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/books/:id", () => {
  it("should delete a book, then return 404 the second time", async () => {
    expect((await request(app).delete("/api/books/1")).status).toBe(200);
    expect((await request(app).delete("/api/books/1")).status).toBe(404);
  });
});
