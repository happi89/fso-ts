import { OccupationalHealthcareEntry as Entry } from '../../types';

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
	return (
		<div style={{ border: '1px solid black', padding: '5px', margin: '5px' }}>
			<p>{entry.date}</p>
			<p>Visit Type: {entry.type}</p>
			<p>Employer: {entry.employerName}</p>
			<p>{entry.description}</p>
			<p>{entry.specialist}</p>
		</div>
	);
};

export default OccupationalHealthcare;
