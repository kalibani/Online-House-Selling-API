const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let houseSchema = new Schema({
  nama:{
    type: String
  },
  lokasi:{
    type: String
  },
  harga:{
    type: String
  },
  image: String
  },
  detail: String
})

module.exports = mongoose.model('House', houseSchema)
