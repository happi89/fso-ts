import { useStateValue } from '../../state';
import { Formik, Form, Field } from 'formik';
import {
	DiagnosisSelection,
	EntryOption,
	SelectField,
	TextField,
	HealthRatingOption,
} from '../../AddPatientModal/FormField';
import { Entry, EntryTypes, HealthCheckRating } from '../../types';
import { Button, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../../constants';

export type EntryFormValues = Omit<Entry, 'id' | 'type'>;

const EntryOptions: EntryOption[] = [
	{ value: EntryTypes.Hospital, label: 'Hospital Entry' },
	{ value: EntryTypes.HealthCheck, label: 'HealthCheck Entry' },
	{
		value: EntryTypes.OccupationalHealthcare,
		label: 'Occupational Healthcare Entry',
	},
];

const HealthRatingOptions: HealthRatingOption[] = [
	{ value: HealthCheckRating.Healthy, label: 'Healthy' },
	{ value: HealthCheckRating.LowRisk, label: 'Low Risk' },
	{ value: HealthCheckRating.HighRisk, label: 'High Risk' },
	{ value: HealthCheckRating.CriticalRisk, label: 'Critical Risk' },
];

const EntryForm = ({ id }: { id: string }) => {
	const [error, setError] = useState<string>();
	const [{ diagnosis }] = useStateValue();

	const submitNewEntry = async (values: EntryFormValues) => {
		console.log('hlell');
		console.log(values);
		try {
			const { data } = await axios.post<Entry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				{ ...values }
			);
			console.log(data);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				console.error(e?.response?.data || 'Unrecognized axios error');
				setError(
					String(e?.response?.data?.error) || 'Unrecognized axios error'
				);
			} else {
				console.error('Unknown error', e);
				setError('Unknown error');
			}
		}
	};

	return (
		<Formik
			initialValues={{
				type: EntryTypes.Hospital,
				description: '',
				date: '',
				specialist: '',
				diagnosisCodes: [],
				healthCheckRating: HealthCheckRating.Healthy,
			}}
			onSubmit={submitNewEntry}
			validate={
				(values) => {} /* {
				const requiredError = 'Field is required';
				const errors: { [field: string]: string } = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				if (!values.healthCheck) {
					errors.healthCheck = requiredError;
				}
				return errors;
			} */
			}>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className='form ui'>
						{error && <Alert severity='error'>{`Error: ${error}`}</Alert>}
						<SelectField
							label='Entry Type'
							name='type'
							options={EntryOptions}
						/>
						<Field
							label='Description'
							placeholder='Description'
							name='description'
							component={TextField}
						/>
						<Field
							label='Date'
							placeholder='YYYY-MM-DD'
							name='date'
							component={TextField}
						/>
						<Field
							label='Specialist'
							placeholder='Specialist'
							name='specialist'
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnosis)}
						/>
						<SelectField
							label='Health rating'
							name='healthCheckRating'
							options={HealthRatingOptions}
						/>
						<Grid>
							<Grid item>
								<Button
									color='secondary'
									variant='contained'
									style={{ float: 'left' }}
									type='button'
									// onClick={onCancel}
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{
										float: 'right',
									}}
									type='submit'
									variant='contained'
									// disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default EntryForm;
