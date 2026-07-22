import { getPatients } from "./patientService";
import { getAppointments } from "./appointmentService";

export const getDashboardStats = async () => {
  const [patients, appointments] = await Promise.all([
    getPatients(),
    getAppointments(),
  ]);

  return {
    totalPatients: patients.length,

    activePatients: patients.filter(
      (patient) => patient.status === "Active"
    ).length,

    todaysAppointments: appointments.length,

    pendingRecords: 0,
  };
};