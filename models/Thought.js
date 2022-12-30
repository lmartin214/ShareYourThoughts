const { Schema, model } = require("mongoose");
const dayjs = require("dayjs"); //For Date Stamps
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(  //Schema for thoughts 
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm'),
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
      getters: true
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {  // Virtual property that tracks the thoughts reactions count
    return this.reactions.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;