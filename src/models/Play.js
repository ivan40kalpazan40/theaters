const mongoose = require('mongoose');
const validator = require('validator');

const playSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 50 },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isURL(v);
      },
      message: 'Must be a valid URL.',
    },
  },
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now(), required: true },
  usersLiked: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

playSchema.method('getLikes', function () {
  const likes = this.usersLiked.length;
  const output = likes == 1 ? `${likes} like` : `${likes} likes`;
  return output;
});

const Play = mongoose.model('Play', playSchema);
module.exports = Play;
