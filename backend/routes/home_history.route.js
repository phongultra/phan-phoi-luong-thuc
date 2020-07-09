const express = require('express');
const app = express();
const HomeHistoryRoute = express.Router();

// HomeHistory model
let HomeHistory = require('../models/HomeHistory');

// Get History by homeId
HomeHistoryRoute.route('/:id').get((req, res) => {
  HomeHistory.find({ 'homeId': req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Create one history by Home ID
HomeHistoryRoute.route('/create').post((req, res, next) => {
  if (req._body) {
    let _date = Date.now();
    let _data = {
      homeId: req.body.id,
      people: req.body.people,
      modified_date: _date
    }
    HomeHistory.create(_data, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('History created successfully')
      }
    })
  }
});


module.exports = HomeHistoryRoute;