const validateMiddleware = (schema) =>
  async (req, res, next) => {
    try {
      const validatedRequest = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = validatedRequest.body;
      req.query = validatedRequest.query;
      req.params = validatedRequest.params;

      return next();
    } catch (error) {
      next({ ...error, status: 400 });
    }
  };

module.exports = {
  validateMiddleware,
};