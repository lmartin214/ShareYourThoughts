//Thoughts API routes
const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

//Route /api/thoughts
router.route("/").get(getThoughts).post(createThought);

//Route /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);

      //Reactions API routes

//Route /api/thoughts/:thoughtId/reactions
router
.route("/:thoughtId/reactions")
.post(createReaction);

//Route /api/thoughts/:thoughtId/reactions
router
.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction);

module.exports = router;