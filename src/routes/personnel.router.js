"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const personnel = require('../controllers/personnel.controller')
const permission = require('../middlewares/permissions')


// URL: /personnels

// // Login/logout:
// router.post('/login', personnel.login)
// router.all('/logout', personnel.logout)

router.route('/')
    .get(permission.isLogin, personnel.list)
    .post(permission.isAdmin, personnel.create)

router.route('/:id')
    .get(permission.isLogin,personnel.read)
    .put(permission.isAdmin,personnel.update)
    .patch(permission.isAdmin,personnel.update)
    .delete(permission.isAdmin,personnel.delete)

/* ------------------------------------------------------- */
module.exports = router