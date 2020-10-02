const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  '/',
  [
    check('title')
      .not()
      .isEmpty(),
    check('date')
      .not()
      .isEmpty(),
    check('description')
      .isLength({ min: 5 }),
    check('people')
      .not()
      .isEmpty(),
    check('location')
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
);

router.patch(
  '/:pid',
  [
    check('title')
      .not()
      .isEmpty(),
    check('date')
      .not()
      .isEmpty(),
    check('description')
      .isLength({ min: 5 }),
    check('people')
      .not()
      .isEmpty(),
    check('location')
      .not()
      .isEmpty()
  ],
  placesControllers.updatePlace
);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;