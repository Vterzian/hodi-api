const z = require('zod');

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

const addCardSchema = z.object({
    body: cardSchema,
});

const getOneCardSchema = z.object({
    params: cardParamsSchema,
});

const updateCardSchema = z.object({
    body: cardSchema.deepPartial(),
    params: cardParamsSchema,
});

module.exports = {
    cardSchema,
    cardParamsSchema,
    addCardSchema,
    getOneCardSchema,
    updateCardSchema,
};