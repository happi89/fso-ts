import { useStateValue } from '../../state';
import { Entry } from '../../types';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';

const EntryDetails = ({ entry }: { entry: Entry }) => {
	const [{ diagnosis }] = useStateValue();

	const findDiagnosis = (code: string) => {
		const diagnosisName = Object.values(diagnosis).find(
			(d) => d.code === code
		)?.name;
		return <span>{diagnosisName}</span>;
	};

	const showDiagnosis = () => {
		return entry.diagnosisCodes ? (
			<>
				<h2>Diagnostics</h2>
				<ul>
					{entry?.diagnosisCodes?.map((c) => (
						<li key={c}>
							{c} {findDiagnosis(c)}
						</li>
					))}
				</ul>
			</>
		) : null;
	};

	switch (entry.type) {
		case 'Hospital':
			return (
				<>
					{showDiagnosis()}
					<Hospital entry={entry} />
				</>
			);
		case 'OccupationalHealthcare':
			return (
				<>
					{showDiagnosis()}
					<OccupationalHealthcare entry={entry} />
				</>
			);
		case 'HealthCheck':
			return (
				<>
					{showDiagnosis()}
					<HealthCheck entry={entry} />
				</>
			);
		default:
			return null;
	}
};

export default EntryDetails;
