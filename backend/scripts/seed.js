const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = require("../src/config/db");

const Patient = require("../src/models/Patient");
const MedicalRecord = require("../src/models/MedicalRecord");

const patients = [
  {
    fullName: "Ahmed Hassan",
    dateOfBirth: "1999-02-15",
    gender: "Male",
    phone: "01011111111",
    email: "ahmed@test.com",
    address: "Cairo",
    bloodType: "A+",
    allergies: ["Penicillin"],
    medicalHistory: "Diabetes",
    status: "Active",
  },
  {
    fullName: "Sara Mohamed",
    dateOfBirth: "2001-08-09",
    gender: "Female",
    phone: "01022222222",
    email: "sara@test.com",
    address: "Alexandria",
    bloodType: "O+",
    allergies: [],
    medicalHistory: "Asthma",
    status: "Active",
  },
  {
    fullName: "Omar Ali",
    dateOfBirth: "1988-05-03",
    gender: "Male",
    phone: "01033333333",
    email: "omar@test.com",
    address: "Hurghada",
    bloodType: "B+",
    allergies: ["Dust"],
    medicalHistory: "Hypertension",
    status: "Inactive",
  },
];

async function seedDatabase() {
  try {
    await connectDB();

    await Patient.deleteMany();
    await MedicalRecord.deleteMany();

    const insertedPatients = await Patient.insertMany(patients);

    const medicalRecords = [
      {
        patientId: insertedPatients[0]._id,
        diagnosis: "Type 2 Diabetes",
        medication: "Metformin",
        labResult: "HbA1c: 7.2%",
        notes: "Routine follow-up required.",
        doctor: "Dr. Mahmoud",
      },
      {
        patientId: insertedPatients[1]._id,
        diagnosis: "Asthma",
        medication: "Ventolin Inhaler",
        labResult: "Spirometry: Mild obstruction",
        notes: "Avoid dust exposure.",
        doctor: "Dr. Salma",
      },
      {
        patientId: insertedPatients[2]._id,
        diagnosis: "Hypertension",
        medication: "Amlodipine",
        labResult: "BP: 150/95",
        notes: "Reduce salt intake.",
        doctor: "Dr. Ahmed",
      },
    ];

    await MedicalRecord.insertMany(medicalRecords);

    console.log("Database seeded successfully.");

    mongoose.connection.close();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();