import express from 'express';
const router = express.Router();
import diagnoseService from '../services/diagnoseService'

router.get('/', (_req, res) => {
  return res.send(diagnoseService.getDiagnostics());
});

export default router;