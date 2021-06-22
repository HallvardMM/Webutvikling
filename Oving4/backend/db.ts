import mongoose from 'mongoose';

export const connectDB = async () => {
  //connects to the databse
  try {
    mongoose.connect(
      'mongodb://andreas:hei@it2810-65.idi.ntnu.no:27017/moviesDB?authSource=admin',
      {
        keepAlive: true, // keeping the connection alive
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

mongoose.set('debug', false); // enabling debugging information to be printed to the console for debugging purposes
mongoose.Promise = Promise; // setting mongoose's Promise to use Node's Promise

exports.connectDB = connectDB;
