const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {
  async index (req, res) {
    const { user_id } = req.params;

    try {
      const techs = await User.findByPk(user_id, {
        include: { association: 'techs', through: { attributes: [] } }
      });

      if ( ! techs) {
        return res.status(404).json({
          error: 404,
          message: 'User not found.'
        });
      }

      return res.status(200).json({ techs })
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 500,
        message: 'Error to loading addresses.'
      });
    }
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    try {
      const user = await User.findByPk(user_id);

      if ( ! user) {
        return res.status(404).json({
          error: 404,
          message: 'User not found.'
        });
      }

      const [ tech ] = await Tech.findOrCreate({
        where: { name }
      });

      await user.addTech(tech);

      return res.status(201).json({ tech });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 500,
        message: 'Error on create tech.'
      });
    }
  },

  async destroy (req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    try {
      const user = await User.findByPk(user_id);

      if ( ! user) {
        return res.status(404).json({
          error: 404,
          message: 'User not found.'
        });
      }

      const tech = await Tech.findOne({ where: { name } });

      if ( ! tech) {
        return res.status(404).json({
          error: 404,
          message: 'Tech not found.'
        });
      }

      await user.removeTech(tech);

      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({
        error: 500,
        message: 'Error on destroy tech.'
      });
    }
  }
}