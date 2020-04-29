const express = require('express');
const router = express.Router();
const passport = require('passport');

const movieController = require('../controllers/movies');
const authUserController = require('../controllers/auth');

router
  .route('/login')
  .post(authUserController.authUser);

router
  .route('/profile')
  .get(passport.authenticate('jwt', {session: false}), authUserController.profileUser);

router
  .route('/:login')
  .get(movieController.getById)
  .delete(passport.authenticate('jwt', {session: false}),movieController.deleteById)
  .put(passport.authenticate('jwt', {session: false}), movieController.updateById);

router
  .route('/')
  .get(movieController.getAll);

router
  .route('/register')
  .post(passport.authenticate('jwt', {session: false}), movieController.create);


module.exports = router;
