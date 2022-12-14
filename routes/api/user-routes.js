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


router.route('/')
  .get(getAllUsers)
  .post(createUser);


router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);


router
  .route('/:userId/friends/:friendId')
  .post(addNewFriend)
  .delete(deleteFriend);

module.exports = router;