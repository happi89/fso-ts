import patients from '../../data/patients';
import {
	PatientWithoutSSN,
	Patient,
	NewPatient,
	Entry,
	NewEntry,
} from '../types';
import { nanoid } from 'nanoid';
const id = nanoid();

const patientsWithoutSSN: Array<PatientWithoutSSN> = patients;

const getPatients = (): Array<PatientWithoutSSN> => {
	return patientsWithoutSSN.map(
		({ id, name, dateOfBirth, gender, occupation, entries }) => ({
			id,
			name,
			dateOfBirth,
			gender,
			occupation,
			entries,
		})
	);
};

const getOnePatient = (id: string) => {
	return patients.find((p) => p.id === id);
};

const createPatient = (object: NewPatient): Patient => {
	const newPatient = {
		...object,
		id,
	};

	patients.push(newPatient);
	return newPatient;
};

const createEntry = (object: NewEntry, id: string): Entry => {
	const newEntry = {
		...object,
		id,
	};

	patients.find((p) => p.id === id)?.entries.push(newEntry);

	return newEntry;
};

export default { getPatients, createPatient, getOnePatient, createEntry };
