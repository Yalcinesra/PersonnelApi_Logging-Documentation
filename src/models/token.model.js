"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
//const passwordEncrypt = require('../helpers/passwordEncrypt')

const TokenSchema = new mongoose.Schema({
   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Personnel',
        required: true,
    },

    token: {
        type: String,
        trim: true,
        required: true,
    },

}, { collection: 'tokens', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('Token', TokenSchema)