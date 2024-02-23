"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

module.exports = {

    isLogin: async (req, res,next) => {
        if(req.user && req.user.isActive){
            next()

        }else{
            res.errorStatusCode=403
            throw new Error('No permission you have to LOGIN')

        }
        

    },
    isAdmin: async (req, res,next) => {

        if(req.user && req.user.isActive && req.user.isAdmin){
            next()

        }else{
            res.errorStatusCode=403
            throw new Error('No permission, you have to LOGIN as a  ADMIN')

        }
        

    },
 
}