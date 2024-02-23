"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const User = require('../models/personnel.model')
const Token = require('../models/token.model')

module.exports =async (req, res, next) => {
    const auth=req.headers?.authorization || null
    const tokenKey=auth ? auth.split(' '): null

    if(tokenKey && tokenKey[0]=='Token'){

        const tokenData=await Token.findOne({token:tokenKey[1]})
        if(tokenData) req.user=await User.findOne({_id:tokenData.userId})
        

    }
   next()
}