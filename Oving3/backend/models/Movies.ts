//File used for defining movie schema matches collection in MongoDB

import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  name: String,
  review: String
}

export interface IMovie extends Document {
  budget: String,
  company: String,
  country: String,
  director: String,
  genre: String,
  gross: String,
  name: any, //Any to allow regex search
  rating: String,
  released: String,
  runtime: String,
  score: String,
  star: String,
  votes: String,
  writer: String,
  year: String,
  reviews: IReview[],
}



const MoviesSchema = new Schema({
  //creates the schema for movies
  budget: Number,
  company: String,
  country: String,
  director: String,
  genre: String,
  gross: Number,
  name: String,
  rating: String,
  released: String,
  runtime: Number,
  score: Number,
  star: String,
  votes: Number,
  writer: String,
  year: Number,
  reviews: [],
});


// mongoose adds a s and makes letters small if pluralize is not set
mongoose.pluralize(null);

const Movie = mongoose.model<IMovie>(
  'Movies',
  MoviesSchema
)

export default Movie;