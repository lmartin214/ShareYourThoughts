const { Schema, model } = require("mongoose");
const dayjs = require("dayjs");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought required!",
      minlength: 1,
      maxlength: 280,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;