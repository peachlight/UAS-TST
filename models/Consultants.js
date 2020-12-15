const mongoose = require('mongoose')

const ConsultantSchema = new mongoose.Schema({
      idConsult: {
        type: String,
        required: true,
      },
      cname: {
        type: String,
        required: true,
      },
      sex: {
        type: String,
        required: true,
        enum: ['F', 'M']
      },
      location: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      cp: {
        type: Number,
        required: true,
      },
    })
    
module.exports = mongoose.model('Consultant', ConsultantSchema)