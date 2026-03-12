const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/immediate-risk', function (req, res) {
  res.render('immediate-risk')
})

router.post('/immediate-risk', function (req, res) {
  const answer = req.session.data['immediate-risk']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'immediate-risk': 'Select yes if you are having thoughts of harming yourself, or no if you are not' }
    return res.render('immediate-risk')
  }
  if (answer === 'yes') {
    return res.redirect('/ineligible-immediate-risk')
  }
  res.redirect('/eating-frequency')
})

router.get('/ineligible-immediate-risk', function (req, res) {
  res.render('ineligible-immediate-risk')
})

router.get('/eating-frequency', function (req, res) {
  res.render('eating-frequency')
})

router.post('/eating-frequency', function (req, res) {
  const answer = req.session.data['eating-frequency']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'eating-frequency': 'Select how often you are eating more than you want to' }
    return res.render('eating-frequency')
  }
  res.redirect('/impact-daily-life')
})

router.get('/impact-daily-life', function (req, res) {
  res.render('impact-daily-life')
})

router.post('/impact-daily-life', function (req, res) {
  const answer = req.session.data['impact-daily-life']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'impact-daily-life': 'Select yes if this is affecting your daily life, or no if it is not' }
    return res.render('impact-daily-life')
  }
  res.redirect('/support-type')
})

router.get('/support-type', function (req, res) {
  res.render('support-type')
})

router.post('/support-type', function (req, res) {
  const answer = req.session.data['support-type']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'support-type': 'Select the type of support that would be most helpful' }
    return res.render('support-type')
  }
  res.redirect('/contact-preference')
})

router.get('/contact-preference', function (req, res) {
  res.render('contact-preference')
})

router.post('/contact-preference', function (req, res) {
  const answer = req.session.data['contact-preference']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-preference': 'Select how you would prefer to be contacted' }
    return res.render('contact-preference')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('EH')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
