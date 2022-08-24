import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
	res.send(patientService.getOnePatient(req.params.id));
});

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.createPatient(newPatient);

		res.send(addedPatient);
	} catch (error) {
		let errorMessage = 'something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

router.post('/:id/entries', (req, res) => {
	try {
		const id = req.params.id;
		const newEntry = toNewEntry(req.body);
		const addedEntry = patientService.createEntry(newEntry, id);
		res.send(addedEntry);
	} catch (error) {
		let errorMessage = 'something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error ' + error.message;
		}
		res.status(400).send(errorMessage);
	}
});

export default router;
