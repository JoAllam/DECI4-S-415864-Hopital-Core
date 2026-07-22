import axios from "axios";

const API =
  process.env.REACT_APP_APPOINTMENT_API_URL ||
  "/api/appointments";

export const getAppointments = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const createAppointment = async (appointment) => {
  const response = await axios.post(API, appointment);
  return response.data;
};