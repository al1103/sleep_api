import bcryptjs from 'bcryptjs';
import { DataTypes, Model } from 'sequelize';
import { roles } from '../config/roles.js';
import sequelize from '../config/sequelize.js';
import paginate from './plugins/pagination.js';

const SALT_ROUNDS = 10;

class User extends Model {
  async validatePassword(password) {
    return bcryptjs.compare(password, this.password);
  }

  static async isEmailTaken(email) {
    const user = await User.findOne({ where: { email } });
    return !!user;
  }

  static async hashPassword(user) {
    if (user.changed('password')) {
      user.password = await bcryptjs.hash(user.password, SALT_ROUNDS);
    }
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    role: {
      type: DataTypes.ENUM(roles),
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize, 
    modelName: 'User',
  }
);

User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);

User.paginate = paginate;

export default User;
