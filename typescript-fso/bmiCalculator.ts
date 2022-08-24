interface Arguments {
  value1: number,
  value2: number
}

export const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBMI = (mass: number, height: number): string => {
  const heightInMeters: number = height / 100;
  const BMI: number = +Math.round(mass / (heightInMeters ** 2)).toFixed(1);

  if (BMI < 16) {
    return 'Underweight (Severe thinness)';
  } else if(16 > BMI && BMI <= 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if(17 > BMI && BMI <= 18.4) {
    return 'Underweight (Mild Thinness)';
  } else if(18.5 > BMI && BMI <= 24.9) {
    return 'Normal (Healthy Weight)';
  } else if (25 > BMI && BMI <= 29.9) {
    return 'Overweight (Pre-Obese)';
  } else if (30 > BMI ) {
    return 'Obese';
  } else {
    return 'wrong values!';
  }
};


try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBMI(value1, value2);
} catch(error: unknown) {
  let errorMessage = 'Something went wrong.';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
  }
}

export default calculateBMI;