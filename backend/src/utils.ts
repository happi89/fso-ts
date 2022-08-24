import {
	NewEntry,
	Gender,
	NewPatient,
	newEntry,
	OccupationalHealthcareEntry,
	HospitalEntry,
	HealthCheckEntry,
	HealthCheckRating,
	EntryTypes,
} from './types';

const isString = (str: unknown): str is string => {
	return typeof str === 'string' || str instanceof String;
};

const parseString = (field: unknown, type: string): string => {
	if (!field || !isString(field)) {
		throw new Error(`missing or invalid ${type}: ` + field);
	}
	return field;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('missing or invalid date: ' + date);
	}
	return date;
};

const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('invalid or missing gender: ' + gender);
	}
	return gender;
};

const toNewPatient = (object: any): NewPatient => {
	const newPatient = {
		name: parseString(object.name, 'name'),
		dateOfBirth: parseDate(object.dateOfBirth),
		gender: parseGender(object.gender),
		occupation: parseString(object.occupation, 'occupation'),
		ssn: parseString(object.ssn, 'ssn'),
		entries: object.entries,
	};

	return newPatient;
};

const isHealthCheck = (param: any): param is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheck = (obj: unknown): HealthCheckRating => {
	if (!obj || !isHealthCheck(obj)) {
		throw new Error('invalid or missing Health check rating: ' + obj);
	}
	return obj;
};

const isType = (obj: unknown): obj is EntryTypes => {
	return (obj as EntryTypes).type ? true : false;
};

const toNewEntry = (object: any): NewEntry => {
	const baseEntry: newEntry = {
		description: parseString(object.description, 'description'),
		date: parseDate(object.date),
		specialist: parseString(object.specialist, 'specalist'),
		diagnosisCodes: object?.diagnosisCodes?.map((c: string) =>
			parseString(c, 'code')
		),
	};

	isType(object.type);

	if (object.type === 'Hospital') {
		const newEntry: Omit<HospitalEntry, 'id'> = {
			...baseEntry,
			type: object.type,
			discharge: {
				date: parseDate(object.date),
				criteria: parseString(object.criteria, 'criteria'),
			},
		};
		return newEntry;
	} else if (object.type === 'HealthCheck') {
		const newEntry: Omit<HealthCheckEntry, 'id'> = {
			...baseEntry,
			type: object.type,
			healthCheckRating: parseHealthCheck(object.healthCheckRating),
		};
		return newEntry;
	} else if (object.type === 'OccupationalHealthcare') {
		const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
			...baseEntry,
			type: object.type,
			employerName: parseString(object.employerName, 'employer name'),
			sickLeave: {
				startDate: parseDate(object.startDate),
				endDate: parseDate(object.endDate),
			},
		};
		return newEntry;
	} else {
		throw new Error('invalid submission');
	}
};

export { toNewPatient, toNewEntry };
