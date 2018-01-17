const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let houseSchema = new Schema({
  nama:{
    type: String
  },
  pemilik: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lokasi:{
    type: String
  },
  latitude:{
    type: Number
  },
  longitude:{
    type: Number
  },
  harga:{
    type: String
  },
  image:{
    type: String
  },
  detail:{
    type: String
  }
})

module.exports = mongoose.model('House', houseSchema)
