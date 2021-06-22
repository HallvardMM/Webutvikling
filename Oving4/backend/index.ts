const express = require('express'); // our express server
const cors = require('cors') //Imported to not have cors problems
const app = express(); // generate an app object
const PORT = process.env.PORT || 3000; // port that the server is running on => localhost:3000
import { connectDB } from './db';

app.use(cors()) // Used to not have CORS problems while sending data.

connectDB();
app.use(express.json({ extended: false }));
app.listen(PORT, () => {
  // listening on port 3000
  console.log(`listening on port ${PORT}`); // print port number when the server starts
});

//app.use('/initdb/addtable', require('./initdb/addtable')) used to add data to database.


import Movie from './models/Movies';
import User from './models/Users';

app.get('/alltitles', async (req, res) => {
  //returns all movietitles from database
  try {
    const movies = await Movie.distinct('name');
    res.json(movies);
  } catch (error) {
    console.error(error)
    res.json({ error: "error" });
  }
});

app.get('/allratings', async (req, res) => {
  //returns all ratings from database
  try {
    const movies = await Movie.distinct('rating');
    res.json(movies);
  } catch (error) {
    console.error(error)
    res.json({ error: "error" });
  }
});


app.get('/alldirectors', async (req, res) => {
  //returns all directors from database
  try {
    const movies = await Movie.distinct('director');
    res.json(movies);
  } catch (error) {
    console.error(error)
    res.json({ error: "error" });
  }
});


app.get('/allyears', async (req, res) => {
  //returns all possible years from database
  try {
    const movies = await Movie.distinct('year');
    res.json(movies);
  } catch (error) {
    console.error(error)
    res.json({ error: "error" });
  }
});

app.get('/allgenres', async (req, res) => {
  //returns all possible genres from database
  try {
    const movies = await Movie.distinct('genre');
    res.json(movies);
  } catch (error) {
    console.error(error)
    res.json({ error: "error" });
  }
});



app.post('/checkuser', async (req, res) => {
  //Post function should return username if user exists and emotystring otherwise
  try {
    const name = req.body.username
    const pwd = req.body.password
    const user = await User.exists({ name: name, password: pwd });
    if (user) {
      res.json({ "userLoggedIn": name })
    }
    else {
      res.json({ "userLoggedIn": "" })
    }
  } catch (error) {
    console.error(error)
    res.json({ error: "error" });
  }
});


app.post('/adduser', async (req, res) => {
  //Put function returns name if user exists and return value from adduser if new user is added.
  try {
    const name = req.body.username
    const pwd = req.body.password
    const checkuser = await User.exists({ name: name });
    if (checkuser) {
      res.json({ "checkuser": name })
    } else {
      await User.create({ name: name, password: pwd });
      res.json({ "createuser": name })
    }

  } catch (error) {
    res.json({ error: "error" });
  }
});

function makeObject(liste) {
  //Makes it possible to send in empty filters 
  if (liste.length == 0) {
    //{ $exists: true } is how MongoDB knows if an input should not be filtered.
    return { $exists: true }
  }
  return liste
}

app.post('/data', async (req, res) => {
  //Post function should return the data based on what filters, name and sorting is sent from frontend
  try {
    const body = req.body
    const name = body.name
    const year = makeObject(body.year)
    const genre = makeObject(body.genre)
    const director = makeObject(body.director)
    const rating = makeObject(body.rating)
    const limit = body.limit
    const skip = body.skip
    const sortField = body.sortField
    const sortNumber = body.sortNumber

    const movies = await Movie.find({ name: { $regex: name, $options: 'i' }, year: year, rating: rating, director: director, genre: genre }).sort({ [sortField]: sortNumber, _id: 1 }).skip(skip).limit(limit);
    const count = await Movie.find({ name: { $regex: name, $options: 'i' }, year: year, rating: rating, director: director, genre: genre }).countDocuments();
    // Movies = the movies, count = number of movies
    res.json({ "movies": movies, "count": count })
  } catch (error) {
    res.json({ error: "error" });
  }
});

app.put('/review', async (req, res) => {
  //Post function adds review to DB. Returns true if DB updated.
  //Put is used since we don't need response except error
  try {
    const filmId = req.body._id
    const review = req.body.review
    const update = await Movie.findOneAndUpdate({ _id: filmId }, { $push: { reviews: review } }, { new: true })
    await update.save()
    res.json({ "update": "true" })
  } catch (error) {
    console.error(error)
    res.json({ "update": "false" });
  }
});

app.post('/getreviews', async (req, res) => {
  //Post funtion returns reviews based on filmID
  try {
    const filmid = req.body._id
    const reviews = await Movie.find({ _id: filmid }, { "_id": 0, "reviews": 1 })
    res.json(reviews)
  } catch (error) {
    console.error(error)
    res.json({ error: "error" });
  }
});