import EntryDetails from './entries/EntryDetails';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import EntryForm from './EntryFormModal/EntryForm';

const PatientPage = () => {
	const { id } = useParams<{ id: string }>();
	const [{ patient }, dispatch] = useStateValue();

	const currentPatient = Object.values(patient).find((p) => p.id === id);

	if (!currentPatient) {
		useEffect(() => {
			const fetchPatient = async () => {
				try {
					const { data: patient } = await axios.get<Patient>(
						`${apiBaseUrl}/patients/${id!}`
					);
					dispatch({ type: 'PATIENTS', payload: patient });
				} catch (e) {
					console.error(e);
				}
			};
			void fetchPatient();
		}, []);
	}

	return (
		<>
			<div>
				<h1>{currentPatient?.name}</h1>
				<p>Gender: {currentPatient?.gender}</p>
				<p>ssn: {currentPatient?.ssn}</p>
				<p>Occupation: {currentPatient?.occupation}</p>
			</div>
			<h2>Entries</h2>
			{currentPatient?.entries.map((e) => {
				return <EntryDetails key={e.id} entry={e} />;
			})}
			<EntryForm id={id!} />
		</>
	);
};

export default PatientPage;
