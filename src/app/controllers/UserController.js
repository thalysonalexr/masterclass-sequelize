const User = require('../models/User');

module.exports = {
  async index (req, res) {
    const users = await User.findAll();

    return res.status(200).json({ users });
  },

  async show (req, res) {
    const { id } = req.params;

    try {
      const user = await User.findOne({ where: { id } });

      if ( ! user) {
        return res.status(404).json({
          error: 404,
          message: 'User not found.'
        });
      }

      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({
        error: 500,
        message: 'Error on search user.'
      });
    }
  },

  async store(req, res) {
    const { name, email } = req.body;

    try {
      if (await User.findOne({ where: { email } })) {
        return res.status(409).json({
          error: 409,
          message: 'User already exists.'
        });
      }

      const user = await User.create({ name, email });
      
      return res.status(201).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 400,
        message: 'Bad Request.'
      });
    }
  }
}
