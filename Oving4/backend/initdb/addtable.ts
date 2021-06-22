//File used for adding tables automaticlly from csv file. Is not used anymore. Only her if need to add again

/*import express, {Request, Response, NextFunction } from 'express';
import { builtinModules } from 'module';
const router = express.Router();
import Movie from '../models/Movies';
const fs = require('fs');
const fastcsv = require('fast-csv');

let stream = fs.createReadStream(
  'C:/Users/andre/Documents/movies.csv'
);

router.post('/', async (req: Request, res: Response) => {
  let csvData: any = [];
  let csvStream = fastcsv
    .parse()
    .on('data', function (data: any) {
      csvData.push(
        new Movie({
            budget: data[0],
            company: data[1],
            country: data[2],
            director: data[3],
            genre: data[4],
            gross: data[5],
            name: data[6],
            rating: data[7],
            released: data[8],
            runtime: data[9],
            score: data[10],
            star: data[11],
            votes: data[12],
            writer: data[13],
            year: data[14],
            review: [],
        })
      );
    })
    .on('end', function () {
      // remove the first line: header
      csvData.shift();
      Movie.insertMany(csvData);
    });
  stream.pipe(csvStream);
  res.send('dette gikk bra');
});

router.get('/', async (req: any, res: Response) => {
  try {
    const movie = await Movie.find().limit(20);
    if (!movie) {
      return res.status(400).json({ msg: 'There are no restaurants' });
    }
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;*/