const { Thought, User } = require("../models"); //Import models

//Export routes
module.exports = { 
  //Get all thoughts (Read)
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  //Get single thought (Read)
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Create new thought (Read)
  createThought(req, res) {
    Thought.create(req.body)
    .then((thoughtData) => {
      return User.findOneAndUpdate (
        { _id: req.body.userId },
        {$push: { thoughts: [(thoughtData._id), (thoughtData.thoughtText)] } },
        { new: true }
      )
    })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'No user with ID!' })
      : res.json(thought)
    )
      .catch((err) => res.status(500).json(err));
  },

  //Delete thought (Delete)
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Can't think of it" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then(() => {
        res.json({ message: "Thought successfully erased" })
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Update thought (Update)
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //Create reaction, save in thought & update with new reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: {reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //Delete reaction & Update Thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};