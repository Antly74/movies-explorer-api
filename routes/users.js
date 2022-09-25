const userRouter = require('express').Router();
const userControllers = require('../controllers/users');
const { validatePatchUser } = require('../middlewares/validators');

userRouter.get('/me', userControllers.getUsersMe);

userRouter.patch('/me', validatePatchUser, userControllers.patchUserMe);

module.exports = userRouter;
