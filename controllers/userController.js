const { User, Thought } = require("../models"); //Import models

//Export routes
module.exports = { 
  //Get all users (Read)
  getUsers(req, res) {
    User.find({})
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  //Get user by ID (Read)
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //Create user (Create)
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //Update User (Update)
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete User (DELETE) 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ username: user.username })
      )
      .then(() => res.json({ message: "User and Thoughts deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

  //Adds to user's friends list and updates new list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Delete friend from user's friends list and updates new list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
