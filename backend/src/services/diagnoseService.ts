import diagnostics from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnostics = (): Array<Diagnosis> => {
	return diagnostics;
};

const addDiagnostics = () => {
	return 'adding...';
};

export default { getDiagnostics, addDiagnostics };
