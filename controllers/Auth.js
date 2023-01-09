const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

class Auth {
  static async list(_, res) {
    try {
      return res.json({ user: "test" });
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = Auth;
