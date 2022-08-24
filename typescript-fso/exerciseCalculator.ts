interface result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number
  success: boolean,
  rating: number,
  ratingDescription: string,
}

// interface Arguments {
//   value1: Array<number>,
//   value2: number,
// }

// export const parseArguments = (args: Array<string>): Arguments => {
//   const given = args.slice(2);

//   const values: Array<number> = [];
//   given.forEach((value) => !isNaN(Number(value)) ?  values.push(Number(value)) : false);

//   const areNumbers: boolean = values.length < given.length ? false : true;
//   if(!areNumbers) {
//     throw new Error('Provided values were not numbers!');
//   }

//   const target = values.shift();

//   if(target) {
//     return {
//     value1: values,
//     value2: target
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };

const exerciseCalculator = (hours: Array<number>, target: number): result => {
  const average = hours.reduce((x, sum) => x += sum, 0) / hours.length;
  const success = average >= target ? true : false;
  const rating = success ? 3 : (average / target) >= .75 ? 2 : 1;
  
  return {
    periodLength: hours.length,
    trainingDays: hours.filter(x => x > 0).length,
    target,
    average,
    success,
    rating,
    ratingDescription: success ? 'target met!' : rating === 2 ? 'Ok!' : 'Did you even try?'
  };
};

// try {
//   const { value1, value2 } = parseArguments(process.argv);
//   console.log(process.argv);
//   console.log(exerciseCalculator(value1, value2));
// } catch(error: unknown) {
//   let errorMessage = 'something wrong happened';
//   if(error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

export default exerciseCalculator;