require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Appointment = require("../models/Appointments");

const appointments = [
  {
    patientName: "Ahmed Hassan",
    doctor: "Dr. Mahmoud",
    date: "2026-07-25",
    time: "10:00",
    status: "Scheduled",
  },
  {
    patientName: "Sara Mohamed",
    doctor: "Dr. Salma",
    date: "2026-07-26",
    time: "12:30",
    status: "Completed",
  },
  {
    patientName: "Omar Ali",
    doctor: "Dr. Ahmed",
    date: "2026-07-27",
    time: "09:00",
    status: "Cancelled",
  },
];

async function seedAppointments() {
  try {
    await connectDB();

    await Appointment.deleteMany();

    await Appointment.insertMany(appointments);

    console.log("Appointments seeded successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAppointments();