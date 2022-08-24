import { HospitalEntry as Entry } from '../../types';

const Hospital = ({ entry }: { entry: Entry }) => {
	return (
		<div style={{ border: '1px solid black', padding: '5px', margin: '5px' }}>
			<p>{entry.date}</p>
			<p>{entry.description}</p>
			<p>
				Discharged: {entry.discharge.date} {entry.discharge.criteria}
			</p>
			<p>{entry.specialist}</p>
		</div>
	);
};

export default Hospital;
