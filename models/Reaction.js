const { Schema, Types } = require("mongoose");
const dayjs = require ("dayjs"); //For Date stamps

const reactionSchema = new Schema( // Schema for reaactions
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dayjs(timestamp).format('{YYYY} MM-DDTHH:mm'),
      },
    },
    {
      toJSON: {
         getters: true,
      },
      id: false,
    }
  );
  
  module.exports = reactionSchema;