const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getCardListController = async (req, res, next) => {
  try {
    const { page, limit, orderBy, orderDirection } = req.query;
    const skip = (page - 1) * limit;

    const cardList = await prisma.card.findMany({
      skip,
      take: limit,
      orderBy: {
        [orderBy]: orderDirection,
      },
    });

    res.json({
      page,
      limit,
      orderBy: {
        column: orderBy,
        direction: orderDirection,
      },
      result: cardList,
    });
  } catch(error) {
    next(error);
  }
};

const getOneCardController = async (req, res, next) => {
  try {
    const card = await prisma.card.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    res.json(card);
  } catch(error) {
    next(error);
  }
};

const addCardController = async (req, res, next) => {
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
};

const updateCardController = async (req, res, next) => {
  try {
    await prisma.card.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id),
      },
    });
    
    const updatedCard = await prisma.card.update({
      data: req.body,
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    res.json(updatedCard);
  } catch(error) {
    next(error);
  }
};

const deleteCardController = async (req, res, next) => {
  try {
    await prisma.card.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
  
    res.status(204).json('ok');
  } catch(error) {
    next(error);
  }
};

module.exports = {
  getCardListController,
  getOneCardController,
  addCardController,
  updateCardController,
  deleteCardController,
};

// class CardController {
//     constructor() {
//         this.prisma = new PrismaClient();
//     }

//     async getCardList(req, res, next) {
//         try {
//             const cardList = await this.prisma.card.findMany();
//             res.json(cardList);
//         } catch(error) {
//             next(error);
//         }
//     }

//     async getOneCard(req, res, next) {
//         try {
//             const card = await this.prisma.card.findUniqueOrThrow({
//                 where: { id: parseInt(req.params.id) }
//             });
//             res.json(card);
//         } catch(error) {
//             next(error);
//         }
//     }

//     async addCard(req, res, next) {
//         try {
//             const { name, attack, health } = req.body;
//             const newCard = await this.prisma.card.create({
//                 data: { name, attack, health }
//             });
//             res.status(201).json(newCard);
//         } catch(error) {
//             next(error);
//         }
//     }

//     async updateCard(req, res, next) {
//         try {
//             await this.prisma.card.findUniqueOrThrow({
//                 where: { id: parseInt(req.params.id) }
//             });
//             const updatedCard = await this.prisma.card.update({
//                 data: req.body,
//                 where: { id: parseInt(req.params.id) }
//             });
//             res.json(updatedCard);
//         } catch(error) {
//             next(error);
//         }
//     }

//     async deleteCard(req, res, next) {
//         try {
//             const card = await this.prisma.card.delete({
//                 where: { id: parseInt(req.params.id) }
//             });
//             res.status(204).json('ok');
//         } catch(error) {
//             next(error);
//         }
//     }
// }

// module.exports = new CardController();