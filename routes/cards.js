const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { getOneCardSchema, addCardSchema, updateCardSchema } = require('../schemas/card');
const { validateSchema } = require('../middleware/validationMiddleware');

const router = express.Router();
const prisma = new PrismaClient()

/* GET cards listing. */
router.get('/cards', async (req, res, next) => {
  try {
    const cardList = await prisma.card.findMany();

    res.json(cardList);
  } catch(error) {
    next(error);
  }
});

/* GET specific card */
router.get('/cards/:id', validateSchema(getOneCardSchema), async (req, res, next) => {
  try {
    const card = await prisma.card.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.json(card);
  } catch(error) {
    next(error);
  }
});

/* ADD new card */
router.post('/cards', validateSchema(addCardSchema), async (req, res, next) => {
  try {
    const { name, attack, health } = req.body;

    const newCard = await prisma.card.create({
      data: {
        name,
        attack,
        health,
      },
    });

    res.status(201).json(newCard);
  } catch(error) {
    next(error);
  }
});

/* UPDATE a specific card */
router.put('/cards/:id', validateSchema(updateCardSchema), async (req, res, next) => {
  try {
    await prisma.card.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id)
      }
    });
  
    const updatedCard = await prisma.card.update({
      data: req.body,
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.json(updatedCard);
  } catch(error) {
    next(error);
  }
});

/* DELETE specific card */
router.delete('/cards/:id', validateSchema(getOneCardSchema), async (req, res, next) => {
  try {
    const card = await prisma.card.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.status(204).json('ok');
  } catch(error) {
    next(error);
  }
});


module.exports = router;
