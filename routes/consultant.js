const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Consultants = require('../models/Consultants')

// @desc    Show add page
// @route   GET /consultant/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('consultant/add')
})

// @desc    Process add form
// @route   POST /consultants
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Consultants.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show all consultants
// @route   GET /consultants
router.get('/', ensureAuth, async (req, res) => {
  try {
    const consultants = await Consultants.find()
      .populate('user')
      .lean()

    res.render('consultants/index', {
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})



module.exports = router