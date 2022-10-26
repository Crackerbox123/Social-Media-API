const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addNewFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// routes for /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// routes for /api/user/:ID
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// routes for FRIENDS
// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router;