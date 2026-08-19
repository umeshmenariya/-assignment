const validationMiddleware = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true // Extra unwanted fields ko hata dega
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        errors: errorMessages
      });
    }

    req[property] = value;
    next();
  };
};

module.exports = validationMiddleware;