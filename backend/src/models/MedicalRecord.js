const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    diagnosis: {
      type: String,
      required: true,
    },

    medication: {
      type: String,
      default: "",
    },

    labResult: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    doctor: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);