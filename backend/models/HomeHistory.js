const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HomeHistory = new Schema({
   homeId: {
      type: String
   },
   people: {
      type: Object
   },
   modified_date: {
      type: Date
   }
}, {
   collection: 'home_history'
})

module.exports = mongoose.model('HomeHistory', HomeHistory)