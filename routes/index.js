const express = require('express');
const router = express.Router();

const usersRoute = require('./users');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('ok');
});

router.use('/users', usersRoute);

module.exports = router;
