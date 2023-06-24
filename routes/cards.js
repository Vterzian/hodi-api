const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient()

/* GET cards listing. */
router.get('/', async (req, res, next) => {
  const cardList = await prisma.card.findMany();

  res.json(cardList);
});

/* GET specific card */
router.get('/:id', async (req, res, next) => {
  const card = await prisma.card.findUnique({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.json(card);
});

/* ADD new card */
router.post('/', async (req, res, next) => {
  const { name, attack, health } = req.body;
  const newCard = await prisma.card.create({
    data: {
      name,
      attack,
      health,
    },
  });

  res.json(newCard);
});

/* UPDATE a specific card */
router.put('/:id', async (req, res, next) => {
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
});

/* DELETE specific card */
router.delete('/:id', async (req, res, next) => {
  const card = await prisma.card.delete({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.json('ok');
});


module.exports = router;
