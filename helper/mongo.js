const mongoose = require('mongoose');

module.exports = {
  checkValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  },
}
