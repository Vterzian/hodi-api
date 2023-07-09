const express = require('express');
const { getCardListSchema, getOneCardSchema, addCardSchema, updateCardSchema } = require('../schemas/card');
const { validateMiddleware } = require('../middleware/validationMiddleware');
const { 
  getCardListController, 
  getOneCardController, 
  addCardController, 
  updateCardController, 
  deleteCardController, 
} = require('../controllers/cardController');

const router = express.Router();

router.get('/cards', validateMiddleware(getCardListSchema), getCardListController);
router.get('/cards/:id', validateMiddleware(getOneCardSchema), getOneCardController);
router.post('/cards', validateMiddleware(addCardSchema), addCardController);
router.put('/cards/:id', validateMiddleware(updateCardSchema), updateCardController);
router.delete('/cards/:id', validateMiddleware(getOneCardSchema), deleteCardController);

module.exports = router;
