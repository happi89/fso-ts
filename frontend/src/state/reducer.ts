import { State } from './state';
import { Patient, Diagnosis } from '../types';

export type Action =
	| {
			type: 'SET_PATIENT_LIST';
			payload: Patient[];
	  }
	| {
			type: 'ADD_PATIENT';
			payload: Patient;
	  }
	| {
			type: 'PATIENTS';
			payload: Patient;
	  }
	| {
			type: 'SET_DIAGNOSIS';
			payload: Diagnosis[];
	  };

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_PATIENT_LIST':
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients,
				},
			};
		case 'ADD_PATIENT':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		case 'PATIENTS':
			return {
				...state,
				patient: {
					...state.patient,
					[action.payload.id]: action.payload,
				},
			};
		case 'SET_DIAGNOSIS':
			return {
				...state,
				diagnosis: {
					...action.payload.reduce(
						(memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
						{}
					),
					...state.diagnosis,
				},
			};
		default:
			return state;
	}
};
