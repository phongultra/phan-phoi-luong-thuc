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
      res.json(data)
    }
  })
})

//Get count home by district


//...


module.exports = allRoute;