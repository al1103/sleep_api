import Joi from 'joi';

class UserValidationSchema {

  constructor() {
    this.CreateUserSchema = {
      body: Joi.object().keys({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    };

    this.GetUsersSchema= {
      query: Joi.object().keys({
        page: Joi.number().default(1),
        pageSize: Joi.number().default(10),
        orderBy: Joi.valid('createdAt', 'name').default('createdAt'),
        sortBy: Joi.valid('DESC', 'ASC').default('DESC'),
      }),
    };
  }
}

export default new UserValidationSchema();