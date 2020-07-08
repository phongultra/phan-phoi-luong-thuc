const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Home = new Schema({
   name: {
      type: String
   },
   phoneNumber: {
      type: String
   },
   address: {
      type: String
   },
   address_location: {
      type: Object
   },
   people: {
      type: String
   },
   create_date: {
      type: Date
   },
   modified_date: {
      type: Date
   }
}, {
   collection: 'home'
})

module.exports = mongoose.model('Home', Home)