import request from "supertest";
import app from "../src/app";

describe("Employee routes (minimal)", () => {
  describe("POST /api/v1/employees", () => {
    it("should create employee (201)", async () => {
      const payload = {
        name: "Test",
        position: "Teller",
        department: "Operations",
        email: "t@e.com",
        phone: "111-111",
        branchId: "1",
      };
      const res = await request(app).post("/api/v1/employees").send(payload);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("id");
      expect(res.body.name).toBe("Test");
    });

    it("should 400 when required fields missing", async () => {
      const res = await request(app).post("/api/v1/employees").send({ name: "OnlyName" });
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/v1/employees", () => {
    it("should return array (200)", async () => {
      const res = await request(app).get("/api/v1/employees");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
