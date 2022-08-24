import { HealthCheckEntry as Entry } from '../../types';

const HealthCheck = ({ entry }: { entry: Entry }) => {
	return (
		<div style={{ border: '1px solid black', padding: '5px', margin: '5px' }}>
			<p>{entry.date}</p>
			<p>{entry.description}</p>
			<p>HealthCheck Rating: {entry.healthCheckRating}</p>
			<p>{entry.specialist}</p>
		</div>
	);
};

export default HealthCheck;
