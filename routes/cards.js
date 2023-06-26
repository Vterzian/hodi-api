const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient()


// TODO find a better way to check if card exist before updating or deleting
router.all('/:id', async (req, res, next) => {
  try {
    if (req.method !== "GET" || req?.params?.id) {
      await prisma.card.findUniqueOrThrow({
        where: {
          id: parseInt(req.params.id)
        }
      });
    }

    next();
  } catch(error) {
    next(error);
  }
});

/* GET cards listing. */
router.get('/', async (req, res, next) => {
  try {
    const cardList = await prisma.card.findMany();

    res.json(cardList);
  } catch(error) {
    next(error);
  }
});

/* GET specific card */
router.get('/:id', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
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
router.put('/:id', async (req, res, next) => {
  try {
    const { name, attack, health } = req.body;
    const updatedCard = await prisma.card.update({
      data: {
        name,
        attack,
        health,
      },
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
router.delete('/:id', async (req, res, next) => {
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
