import httpStatus from 'http-status';
import { ROLE_KEYS } from '../config/roles.js';
import authService from '../services/auth.service.js';
import tokenService from '../services/token.service.js';
import userService from '../services/user.service.js';
import catchAsync from '../utils/catchAsync.js';

class AuthController {
  constructor(authService, tokenService, userService) {
    this.authService = authService;
    this.tokenService = tokenService;
    this.userService = userService;

    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  register = catchAsync(async (req, res) => {
    const { email, password, name } = req.body;
    const user = await this.userService.createUser({
      email,
      password,
      name,
      role: ROLE_KEYS.USER,
      isEmailVerified: false,
    });
    const tokens = await this.tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  });

  login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await this.authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await this.tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  });
}

export default new AuthController(authService, tokenService, userService);
