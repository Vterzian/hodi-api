/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const { prisma } = require('../prisma/client');

// TODO mock it properly
jest.mock('../prisma/client', () => ({
  prisma: {
    card: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

const cardMock = { 
  id: 1, 
  name: 'test card', 
  cost: 1,
  attack: 1,
  health: 1,
};


describe('GET /cards', () => {
  it('should responds with a paginated card list', async () => {
    const mockCardList = [
      { ...cardMock, id: 1, name: `${cardMock.name} 1` },
      { ...cardMock, id: 2, name: `${cardMock.name} 2` },
      { ...cardMock, id: 3, name: `${cardMock.name} 3` },
      { ...cardMock, id: 4, name: `${cardMock.name} 4` },
    ];

    prisma.card.findMany.mockResolvedValue(mockCardList);

    const page = 1;
    const limit = 15;
    const orderBy = 'id';
    const orderDirection = 'desc';

    const response = await request(app)
      .get('/cards')
      .query({
        page,
        limit,
        orderBy,
        orderDirection,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      page,
      limit,
      orderBy: {
        column: orderBy,
        direction: orderDirection,
      },
      result: mockCardList,
    });
  });
});

describe('GET /cards/:id', () => {
  it('should responds with one card', async () => {
    prisma.card.findUniqueOrThrow.mockResolvedValue(cardMock);
  
    const res = await request(app)
      .get('/cards/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toEqual(cardMock);
  });
});

describe('POST /cards', () => {
  it('should add new card', async () => {
    prisma.card.create.mockResolvedValue(cardMock);

    const response = await request(app)
      .post('/cards')
      .send({
        name: cardMock.name,
        cost: cardMock.cost,
        attack: cardMock.attack,
        health: cardMock.health,
      })
      .expect('Content-Type', /json/);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(cardMock);
  });
});

describe('PUT /cards/:id', () => {
  it('should update an existing card', async () => {
    const updatedCard = { ...cardMock, attack: 2 };

    prisma.card.findUniqueOrThrow.mockResolvedValue(cardMock);
    prisma.card.update.mockResolvedValue(updatedCard);

    const response = await request(app)
      .put('/cards/1')
      .send({
        name: updatedCard.name,
        cost: updatedCard.cost,
        attack: updatedCard.attack,
        health: updatedCard.health,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedCard);
  });
});

describe('DELETE /cards/:id', () => {
  it('should delete an existing card', async () => {
    prisma.card.delete.mockResolvedValue();

    const response = await request(app).delete('/cards/1');

    expect(response.statusCode).toBe(204);
    expect(response.text).toBe('');
  });
});