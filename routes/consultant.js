const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Consultants = require('../models/Consultants')

// @desc    Show add page
// @route   GET /consultant/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('consultant/add')
})

// @desc    Delete consultant
// @route   DELETE /consultant/:id
router.post('/delete/:id', ensureAuth, async (req, res) => {
  try {
    let consultant = await Consultants.findById(req.params.id).lean()

    if (!consultant) {
      return res.render('error/404')
    }
    await Consultants.remove({ _id: req.params.id })
    res.redirect('/dashboard')

  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
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
    const consultants = await Consultant.find()
      .populate('user')
      .lean()

    res.render('consultants/index', {
      consultants,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show single consultant
// @route   GET /consultants/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let consultants = await Consultants.findById(req.params.id).populate('user').lean()
    if (!consultants) {
      return res.render('error/404')
    }

    res.render('consultant/show', {
    consultants
    })
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

// @desc    Show edit page
// @route   GET /consultant/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const consultants = await Consultants.findOne({
      _id: req.params.id,
    }).lean()

    if (!consultants) {
      return res.render('error/404')
    }

    res.render('consultant/edit', {
      consultants,
    })
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Update consultant
// @route   PUT /consultant/:id
router.post('/:id', ensureAuth, async (req, res) => {
  try {
    let consultants = await Consultants.findById(req.params.id).lean()

    if (!consultants) {
      return res.render('error/404')
    }
      consultants = await Consultants.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})



module.exports = router