const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Consultants = require('../models/Consultants')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const name = req.user.displayName;
    const consultants = await Consultants.find().lean()
    res.render('dashboard', {
      consultants, name
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router