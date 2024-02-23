"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const department = require('../controllers/department.controller')
const permission = require('../middlewares/permissions')

// URL: /departments

router.route('/')
    .get(department.list)
    .post(permission.isAdmin, department.create)

router.route('/:id')
    .get(department.read)
    .put(permission.isAdmin,department.update)
    .patch(permission.isAdmin,department.update)
    .delete(permission.isAdmin,department.delete)

router.get('/:id/personnels', department.personnels)

/* ------------------------------------------------------- */
module.exports = router