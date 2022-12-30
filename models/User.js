const { Schema, model } = require("mongoose");

const userSchema = new Schema( //Schema for User
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Valid email required!'],
    },
    thoughts: [
      {
        type: Schema.Types.Array,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

//Virtual property that tracks the User's friends 
userSchema.virtual('friendCount').get(function() { 
      return this.friends.length;
  });

const User = model("User", userSchema);

module.exports = User; //Export User to controllers