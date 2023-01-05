const User = require('./../models/user');

module.exports = {
  async insertUser(data) {
    const { name, username } = data;
    const user = new User({
      name,
      username,
    });
    const result = await user.save();
    return result;
  },

  async getUserByUsername(username) {
    const user = await User.findOne({ username });
    if (!user) {
      return null;
    }
    return user;
  },

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    return user;
  },

  async updateUser(user, id) {
    let userFromDb = await User.findOne({ _id: id })
    const { name } = user;
    userFromDb.name = name;
    await userFromDb.save();
    return userFromDb;
  },

  async deleteUser(id) {
    return await User.findOneAndRemove({ _id: id });
  }
}
