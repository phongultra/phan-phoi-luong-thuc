const express = require('express');
const app = express();
const districtRoute = express.Router();

// District model
let District = require('../models/District');

// Add District
districtRoute.route('/create').post((req, res, next) => {
  District.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log("District create successfully")
    }
  })
});

// Get All Districts
districtRoute.route('/').get((req, res) => {
  District.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single District by district_id
districtRoute.route('/:id').get((req, res) => {
  District.find({"district_id":req.params.id}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update District
// districtRoute.route('/update/:id/:is_change_people').put((req, res, next) => {
//   let _date = Date.now();
//   req.body["modified_date"] = _date;
//   let _district_id = req.params.id;
//   let _is_change_people = req.params.is_change_people;
//   let _people = req.body["people"];
//   District.findByIdAndUpdate(req.params.id, {
//     $set: req.body
//   }, (error, data) => {
//     if (error) {
//       return next(error);
//       console.log(error)
//     } else {
//       res.json(data)
//       if (_is_change_people) {
//         let _data = {
//           districtId: _district_id,
//           people: _people,
//           modified_date: _date
//         }
//         DistrictHistory.create(_data, (error, data2) => {
//           if (error) {
//             return next(error)
//           } else {
//             //res.json(data2)
//             console.log('Data updated successfully - change people')
//           }
//         })
//       }else{
//         console.log('Data updated successfully - not change people')
//       }
//     }
//   })

// })

// // Delete District
// districtRoute.route('/delete/:id').delete((req, res, next) => {
//   District.findOneAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data
//       })
//     }
//   })
// })

module.exports = districtRoute;