const express = require('express');
const app = express();
const homeRoute = express.Router();

// Home model
let Home = require('../models/Home');
let HomeHistory = require('../models/HomeHistory');

// Add Home
homeRoute.route('/create').post((req, res, next) => {
  if (req._body) {
    let _date = Date.now();
    req.body["create_date"] = _date;
    req.body["modified_date"] = _date;
  }
  Home.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log("Home create successfully")
    }
  })
});

// Get All Homes
homeRoute.route('/').get((req, res) => {
  Home.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//get home by district
homeRoute.route('/district/:district').get((req, res) => {
  Home.find({district: parseInt(req.params.district)},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Home
homeRoute.route('/:id').get((req, res) => {
  Home.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Home
homeRoute.route('/update/:id/:is_change_people').put((req, res, next) => {
  let _date = Date.now();
  req.body["modified_date"] = _date;
  let _home_id = req.params.id;
  let _is_change_people = req.params.is_change_people;
  let _people = req.body["people"];
  Home.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      if (_is_change_people) {
        let _data = {
          homeId: _home_id,
          people: _people,
          modified_date: _date
        }
        HomeHistory.create(_data, (error, data2) => {
          if (error) {
            return next(error)
          } else {
            //res.json(data2)
            console.log('Data updated successfully - change people')
          }
        })
      }else{
        console.log('Data updated successfully - not change people')
      }
    }
  })

})

// // Delete Home
// homeRoute.route('/delete/:id').delete((req, res, next) => {
//   Home.findOneAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
//   })
// })

module.exports = homeRoute;