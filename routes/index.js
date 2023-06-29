const express = require('express');
const router = express.Router();

const cardsRoute = require('./cards');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('ok');
});

router.use('/', cardsRoute);

module.exports = router;
