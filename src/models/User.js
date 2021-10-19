const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  liked: [{ type: mongoose.Types.ObjectId, ref: 'Play' }],
});

userSchema.method('addLikedPlay', function (playId) {
  this.liked.push(playId);
  this.save();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
