import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import envVars from '../config/envConfig.js';
import tokenTypes from '../config/tokens.js';
import ApiError from '../utils/ApiError.js';
import userService from './user.service.js';

class TokenService {
  constructor(userService) {
    this.userService = userService;
  }

  _generateToken(userId, expires, type, secret = envVars.JWT_SECRET) {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  }

  async generateAuthTokens(user) {
    const accessTokenExpires = moment().add(envVars.JWT_ACCESS_EXPIRATION_MINUTES, 'minutes');
    const accessToken = this._generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(envVars.JWT_REFRESH_EXPIRATION_DAY, 'days');
    const refreshToken = this._generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  async generateResetPasswordToken(email) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
    }
    const expires = moment().add(envVars.JWT_RESET_PASSWORD_MINUTES, 'minutes');
    const resetPasswordToken = this._generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
    return resetPasswordToken;
  };

  async generateVerifyEmailToken(user) {
    const expires = moment().add(envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES, 'minutes');
    const verifyEmailToken = this._generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
  };
}

export default new TokenService(userService);
