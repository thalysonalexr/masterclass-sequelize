const express = require('express');
const UserController = require('./app/controllers/UserController');
const AddressController = require('./app/controllers/AddressController');
const TechController = require('./app/controllers/TechController');
const ReportController = require('./app/controllers/ReportController');

const router = express.Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    hello: 'World!'
  });
});

router.post('/users', UserController.store);
router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);

router.post('/users/:user_id/addresses', AddressController.store);
router.get('/users/:user_id/addresses', AddressController.index);

router.post('/users/:user_id/techs', TechController.store);
router.get('/users/:user_id/techs', TechController.index);
router.delete('/users/:user_id/techs', TechController.destroy);

router.get('/report', ReportController.show);

module.exports = router;
