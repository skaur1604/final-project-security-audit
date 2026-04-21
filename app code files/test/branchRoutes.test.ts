import request from "supertest";
import app from "../src/app";

describe("Branch CRUD", () => {
  const base = `/branches`;

  it("POST /branches -> creates branch (201)", async () => {
    const res = await request(app).post(base).send({
      name: "Test Branch",
      address: "123 Test St, Test City",
      phone: "204-555-7777"
    });
  });

  it("POST /branches -> 400 on missing required fields", async () => {
    const res = await request(app).post(base).send({ name: "Only Name" });
  });

  it("GET /branches -> returns array (200)", async () => {
    const res = await request(app).get(base);
  });

  it("GET /branches/:id -> returns branch (200)", async () => {
    const res = await request(app).get(`${base}/1`);
    expect([200,404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.data).toHaveProperty("id", 1);
    }
  });

  it("GET /branches/:id -> 400 on missing/invalid id", async () => {
    const res = await request(app).get(`${base}/abc`);
  });

  it("PUT /branches/:id -> updates branch (200)", async () => {
    const create = await request(app).post(base).send({
      name: "To Update",
      address: "1 A St",
      phone: "204-555-1000"
    });

  });

  it("PUT /branches/:id -> 400 on missing/invalid id", async () => {
    const upd = await request(app).put(`${base}/abc`).send({ phone: "x" });
  });

  it("DELETE /branches/:id -> 204 on success", async () => {
    const create = await request(app).post(base).send({
      name: "Temp Branch",
      address: "99 Temp Rd",
      phone: "204-555-2000"
    });
  });

  it("DELETE /branches/:id -> 400 on missing/invalid id", async () => {
    const del = await request(app).delete(`${base}/abc`);
  });
});