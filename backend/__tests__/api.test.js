const request = require("supertest");
const app = require("../server");

describe("API Tests", () => {
  let token = "Bearer test-token";
  let todoId;

  it("Login: valid credentials", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "test", password: "test" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBe("test-token");
  });

  it("Login: invalid credentials", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "bad", password: "bad" });
    expect(res.status).toBe(401);
  });

  it("GET /items: unauthorized", async () => {
    const res = await request(app).get("/items");
    expect(res.status).toBe(401);
  });

  it("GET /items: success", async () => {
    const res = await request(app)
      .get("/items")
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /items: add item", async () => {
    const res = await request(app)
      .post("/items")
      .set("Authorization", token)
      .send({ text: "New todo" });
    expect(res.status).toBe(201);
    expect(res.body.text).toBe("New todo");
    todoId = res.body.id;
  });

  it("POST /items: missing text", async () => {
    const res = await request(app)
      .post("/items")
      .set("Authorization", token)
      .send({});
    expect(res.status).toBe(400);
  });

  it("PUT /items/:id: edit item", async () => {
    const res = await request(app)
      .put(`/items/${todoId}`)
      .set("Authorization", token)
      .send({ text: "Edited todo", done: true });
    expect(res.status).toBe(200);
    expect(res.body.text).toBe("Edited todo");
    expect(res.body.done).toBe(true);
  });

  it("PUT /items/:id: not found", async () => {
    const res = await request(app)
      .put(`/items/999999`)
      .set("Authorization", token)
      .send({ text: "x" });
    expect(res.status).toBe(404);
  });

  it("DELETE /items/:id: delete item", async () => {
    const res = await request(app)
      .delete(`/items/${todoId}`)
      .set("Authorization", token);
    expect(res.status).toBe(204);
  });

  it("DELETE /items/:id: not found", async () => {
    const res = await request(app)
      .delete(`/items/999999`)
      .set("Authorization", token);
    expect(res.status).toBe(404);
  });
});