const validateSchema = (schema) =>
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      next({ ...error, status: 400 });
    }
};

module.exports = {
  validateSchema,
};