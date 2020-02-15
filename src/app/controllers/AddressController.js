const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
  async index (req, res) {
    const { user_id } = req.params;

    try {
      const addresses = await User.findByPk(user_id, {
        include: { association: 'addresses' }
      });

      if ( ! addresses) {
        return res.status(404).json({
          error: 404,
          message: 'User not found.'
        });
      }

      return res.status(200).json({ addresses })
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 500,
        message: 'Error to loading addresses.'
      });
    }
  },

  async store (req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    try {
      const user = await User.findByPk(user_id);

      if ( ! user) {
        return res.status(404).json({
          error: 404,
          message: 'User not found.'
        });
      }

      const address = await Address.create({
        zipcode,
        street,
        number,
        user_id
      });

      return res.status(201).json(address);
    } catch (err) {
      return res.status(500).json({
        error: 500,
        message: 'Failed to create address.'
      });
    }
  }
}
