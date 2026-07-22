import { getPatients } from "./patientService";

export const getDashboardStats = async () => {
  const patients = await getPatients();

  return {
    totalPatients: patients.length,
    activePatients: patients.filter(
      (patient) => patient.status === "Active"
    ).length,
    todaysAppointments: 0,
    pendingRecords: 0,
  };
};