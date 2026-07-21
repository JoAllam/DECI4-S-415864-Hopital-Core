import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import Layout from "../components/shared/Layout";
import PatientList from "../components/patients/PatientList";
import PatientForm from "../components/patients/PatientForm";

import {
  getPatients,
  createPatient,
} from "../services/patientService";

export default function Patients() {

  const queryClient = useQueryClient();

  const {
    data: patients = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
  

  const addPatientMutation = useMutation({
  mutationFn: createPatient,

  onMutate: async (newPatient) => {
    await queryClient.cancelQueries({ queryKey: ["patients"] });

    const previousPatients = queryClient.getQueryData(["patients"]);

    queryClient.setQueryData(["patients"], (old = []) => [
      ...old,
      {
        ...newPatient,
        _id: Date.now().toString(),
      },
    ]);

    return { previousPatients };
  },

  onError: (err, newPatient, context) => {
    queryClient.setQueryData(
      ["patients"],
      context.previousPatients
    );
  },

  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: ["patients"],
    });
  },
});

  const handleAddPatient = (patient) => {
    addPatientMutation.mutate(patient);
  };

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Failed to load patients.</p>;

  return (
    <Layout>
      <h1>Patient Management</h1>

      <PatientForm onAddPatient={handleAddPatient} />

      <hr />

      <PatientList patients={patients} />
    </Layout>
  );
}