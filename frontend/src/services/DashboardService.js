import { getPatients } from "./patientService";
import { getAppointments } from "./appointmentService";

export const getDashboardStats = async () => {
  const patients = await getPatients();
  const appointments = await getAppointments();

  return {
    totalPatients: patients.length,
    activePatients: patients.filter(
      (patient) => patient.status === "Active"
    ).length,
    todaysAppointments: appointments.length,
    pendingRecords: 0,
  };
};