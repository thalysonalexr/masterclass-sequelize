const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
  async show (req, res) {
  
    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@gmail.com'
        }
      },
      include: [
        {
          association: 'addresses',
          where: {
            street: {
              [Op.iLike]: '%Av.%'
            }
          }
        },
        {
          association: 'techs',
          required: false,
          where: {
            name: {
              [Op.iLike]: '%js%'
            }
          } 
        }
      ]
    });

    return res.status(200).json(users);
  }
}
