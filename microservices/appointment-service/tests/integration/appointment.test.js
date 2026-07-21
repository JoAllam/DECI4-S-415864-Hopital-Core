const request = require("supertest");
const mongoose = require("mongoose");

require("dotenv").config();

const app = require("../../app");
const connectDB = require("../../config/db");
const Appointment = require("../../models/Appointments");

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Appointment.deleteMany();
});

describe("Appointment API", () => {
  test("GET /api/health returns 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("POST /api/appointments creates an appointment", async () => {
    const response = await request(app)
      .post("/api/appointments")
      .send({
        patientName: "Ahmed Hassan",
        doctor: "Dr. Ali",
        date: "2026-07-22",
        time: "10:00",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.patientName).toBe("Ahmed Hassan");
  });

  test("GET /api/appointments returns appointments", async () => {
    await Appointment.create({
      patientName: "Sara",
      doctor: "Dr. Omar",
      date: "2026-07-22",
      time: "11:00",
    });

    const response = await request(app).get("/api/appointments");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});