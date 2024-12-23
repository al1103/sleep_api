import httpStatus from 'http-status';
import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';

class UserService {
  constructor() {}

  async createUser(user) {
    if (await User.isEmailTaken(user.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return User.create(user);
  }

  async getUsers(query) {
    const { page, pageSize, orderBy, sortBy } = query;
    return User.paginate({
      page,
      pageSize,
      order: [[orderBy, sortBy]],
      where: {},
    });
  }

  async getUserByEmail(email) {
    return User.findOne({ where: { email } });
  };
}

export default new UserService();
