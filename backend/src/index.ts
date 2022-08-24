import express from 'express';
import diagnoseRouter from './routes/diagnose';
import patientRouter from './routes/patient'
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3003;

app.get('/api/ping', (_req, res) => {
  res.send('hello world!');
});

app.use('/api/diagnostics', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});