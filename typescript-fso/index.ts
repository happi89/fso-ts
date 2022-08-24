import express from 'express';
const app = express();
import calculateBMI from './bmiCalculator';
import calculator from './calculator';
import exerciseCalculator from './exerciseCalculator';

app.use(express.json())

app.get('/', (_req, res) => {
  return res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const BMI = calculateBMI(weight, height);
  
  if(!height || !weight) {
    return res.status(400).json({error: "malformatted parameters"});
  }

  return res.send({height, weight, BMI});
});

app.post('/calcualte', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: 'value 1 is not a number'});
  }

  if ( !value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: 'value 2 is not a number'});
  }

  if (!op) {
    return res.status(400).send({ error: 'invalid operation'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);
  return res.send(result);
});

app.post('/exercise-calculator', (req, res) => {
  const hours: Array<number> = req.body.daily_exercises;
  const target = +req.body.target;

  console.log(hours);
  console.log(typeof target);

  if(isNaN(Number(target)) || isNaN(Number(hours)) || hours.map((n) => isNaN(Number(n)))) {
    return res.status(400).send({error: "malformatted parameters"})
  }

  if(!hours || !target) {
    return res.status(400).send({error: "parameters missing"});
  }

  const result = exerciseCalculator(hours, target);
  return res.send(result);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});