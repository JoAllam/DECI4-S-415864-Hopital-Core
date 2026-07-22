import { getPatients } from "./patientService";
import { getAppointments } from "./appointmentService";

export const getDashboardStats = async () => {
  const [patients, appointments] = await Promise.all([
    getPatients(),
    getAppointments(),
  ]);

  const today = new Date().toISOString().split("T")[0];

  return {
    totalPatients: patients.length,

    activePatients: patients.filter(
      (patient) => patient.status === "Active"
    ).length,

    todaysAppointments: appointments.length,

    pendingRecords: 0,
  };
};