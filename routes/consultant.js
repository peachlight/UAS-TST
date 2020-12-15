const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Consultants = require('../models/Consultants')

// @desc    Show add page
// @route   GET /consultant/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('consultant/add')
})

module.exports = router