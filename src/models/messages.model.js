const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema({
  userToken: {
    type: String,
    required: true,
  },
  messages: [
    {
      from: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
