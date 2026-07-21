const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../src/app");
const Patient = require("../../src/models/Patient");
const connectDB = require("../../src/config/db");

require("dotenv").config();

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Patient.deleteMany();
});

describe("Patients API", () => {
  test("GET /api/health returns 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("POST /api/patients creates a patient", async () => {
    const response = await request(app)
      .post("/api/patients")
      .send({
        fullName: "Integration Test",
        dateOfBirth: "2000-01-01",
        gender: "Male",
        phone: "01000000000",
        bloodType: "A+",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.fullName).toBe("Integration Test");
  });

  test("GET /api/patients returns patients", async () => {
    await Patient.create({
      fullName: "Ahmed",
      dateOfBirth: "1999-01-01",
      gender: "Male",
      phone: "01011111111",
      bloodType: "O+",
    });

    const response = await request(app).get("/api/patients");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});