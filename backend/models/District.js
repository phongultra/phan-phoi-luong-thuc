const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let District = new Schema({
   name: {
      type: String
   },
   district_id: {
      type: String
   },
   polygon: {
      type: Object
   },
}, {
   collection: 'district'
})

module.exports = mongoose.model('District', District)