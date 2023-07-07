const z = require('zod');


// Base Schemas
const cardSchema = z.object({
  name: z.string().min(1).max(255),
  cost: z.number().min(0),
  attack: z.number().min(0),
  health: z.number().min(1),
  description: z.string().max(255).nullish(),
});

const cardParamsSchema = z.object({
  id: z.coerce.number(),
});

const cardQuerySchema = z.object({
  page: z.coerce.number().min(1).max(255).default(1),
  limit: z.coerce.number().min(1).max(255).default(10),
  orderBy: z.coerce.string().max(255).default('id'),
  orderDirection: z.coerce.string().default('desc'), 
});

// Endpoint Schemas
const getCardListSchema = z.object({
  query: cardQuerySchema,
});

const getOneCardSchema = z.object({
  params: cardParamsSchema,
});

const addCardSchema = z.object({
  body: cardSchema,
});

const updateCardSchema = z.object({
  body: cardSchema.deepPartial(),
  params: cardParamsSchema,
});

module.exports = {
  cardSchema,
  cardParamsSchema,
  cardQuerySchema,
  getCardListSchema,
  getOneCardSchema,
  addCardSchema,
  updateCardSchema,
};