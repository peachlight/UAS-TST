const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Consultant = require('../models/Consultants')

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
    const consultants = await Consultant.find({ user: req.user.id }).lean() //Ubah ini nanti
    res.render('dashboard', {
      name: req.user.firstName,
      consultants,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router