const { httpStatus } = require('../config/constants');
const { checkValidId } = require('../helper/mongo');
const {
  insertUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  getUserById,
} = require('../service/user');

class User {
  async addUser(req, res) {
    try {
      const { body } = req;
      const { user } = body;
      if (!user) {
        return res.response(httpStatus.badRequest, {
          message: 'user is undefined',
        });
      }
      const result = await insertUser(user);
      return res.response(httpStatus.ok, {
        message: result,
      });
    } catch (e) {
      return res.response(httpStatus.internalServerError, {
        message: e.message,
      });
    }
  }

  async getUserByUsername(req, res) {
    try {
      const { username } = req.query;
      if (!username) {
        return res.response(httpStatus.badRequest, {
          message: 'username is undefined',
        });
      }

      const result = await getUserByUsername(username);

      if (!result) {
        return res.response(httpStatus.notFound, {
          message: `there is no user with username '${username}'`,
        });
      }

      return res.response(httpStatus.ok, {
        message: 'Success',
        data: result,
      });
    } catch (e) {
      return res.response(httpStatus.internalServerError, {
        message: e.message,
      });
    }
  }

  async updateUserById(req, res) {
    try {
      const { body } = req;
      const { name, id } = body;

      if (!id) {
        return res.response(httpStatus.badRequest, {
          message: 'id is undefined',
        });
      } else if (!checkValidId(id)) {
        return res.response(httpStatus.badRequest, {
          message: 'id is invalid',
        });
      }
      const exist = await getUserById(id);
      if (!exist) {
        return res.response(httpStatus.notFound, {
          message: `there is no user with id '${id}'`,
        });
      }

      let user = {};
      if (name) {
        user = { ...user, name };
      }
      const result = await updateUser(user, id);
      return res.response(httpStatus.ok, {
        message: result,
      });
    } catch (e) {
      return res.response(httpStatus.internalServerError, {
        message: e.message,
      });
    }
  }

  async deleteUserById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.response(httpStatus.badRequest, {
        message: 'id is undefined',
      });
    } else if (!checkValidId(id)) {
      return res.response(httpStatus.badRequest, {
        message: 'id is invalid',
      });
    }
    const result = await getUserById(id);
    if (!result) {
      return res.response(httpStatus.notFound, {
        message: `there is no user with id '${id}'`,
      });
    }

    await deleteUser(id);
    return res.response(httpStatus.ok, {
      message: `user ${id} has been deleted`,
    });
  } catch(e) {
    return res.response(httpStatus.internalServerError, {
      message: e.message,
    });
  }
}

module.exports = new User();
