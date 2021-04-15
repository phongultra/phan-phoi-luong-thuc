const express = require('express');
const app = express();
const allRoute = express.Router();

// Home model
let Home = require('../models/Home');
let HomeHistory = require('../models/HomeHistory');

//Get count all Home
allRoute.route('/count-home').get((req, res) => {
  Home.count({}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Home count", data)
      res.json(data)
    }
  })
})

//Get count all Home
allRoute.route('/count-home-people').get((req, res) => {
  Home.aggregate([
    { $match: { people: { $gte: 0, $lte: 9999 } } },
    { $group: { _id: null, people: { $sum: "$people" } } }
  ], (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("people count", data)
      res.json(data)
    }
  })
})

//Get count home by district


//..


module.exports = allRoute;