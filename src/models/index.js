import userSeeder from '../seeds/user.seed.js';
import User from './user.model.js';

class AppModel {
  async syncModels() {
    await User.sync();
    await userSeeder.seed();
  }
}

export default new AppModel()
